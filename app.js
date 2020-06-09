//const prompt = require('prompt-sync');
const scrap = require('./lib/scrap');
const Ocr = require('./lib/ocr');
const Chinese = require('./language/chinese');
const translate = require('./lib/translate');
const print = require('./lib/print');
const download = require('./lib/downloader');
const sort = require('fast-sort');
let comicLink = '';
//https://rawdevart.com/comic/against-gods/chapter-185/
let apiKey = '51c64f056188957';
let comicLanguage = 'chs';
const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});

(async () => {
  try {
    let fileList =[];
    let isOnline = await prompt('Enter 1 for translate from rawdevart \n or enter 0 for local comic translate : ');
    if(isOnline == 1){
      comicLink = await prompt('Enter the chapter link : ');
      if(comicLink) {
        let scrapData = await scrap(comicLink);
        await download(scrapData.chapterLink);
      }
    }else if (isOnline == 0){

 // console.log(scrapData.chapterLink);
      console.log('hetting file');

    }else{
      console.log('Enetr valid choice');
    }
    fs.readdirSync('./images').forEach(file => {
      //console.log(file);
      fileList.push(file);
    });
    const naturalSort = sort.createNewInstance({
      comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare,
    });

    await naturalSort(fileList).asc();
    //await fileList.sort(function(a, b){return b-a});
    //console.log(fileList);
  let ocrData = await Ocr(apiKey,comicLanguage,fileList);
  //console.log(typeof ocrData[1].ParsedResults[0].TextOverlay);
    //console.log('before slice--------'+ocrData.length);
/*  for(let idx=0;idx < ocrData.length; idx++){
    if(typeof ocrData[idx].ParsedResults[0].TextOverlay === 'undefined'){
      ocrData[idx] = 'NULL'
      scrapData.chapterLink.splice((idx,1));
      console.log('slice null' + idx);
    }
    else{
      if(typeof ocrData[idx].ParsedResults[0].TextOverlay.Lines === 'undefined'){
        ocrData.splice(idx,1);
        scrapData.chapterLink.splice((idx,1));
        console.log('slice null else' + idx);
      }
    }
  }*/
   // console.log('after slice--------'+ocrData.length);
    //console.log(ocrData[0]);
    let cluster = [''],tempClusterObj = {};
    //cluster[0] = '';
    for(let imageNumber = 0; imageNumber < ocrData.length; imageNumber++) {
      if(typeof ocrData[imageNumber].ParsedResults[0].TextOverlay !== 'undefined') {
        console.log('for slice--------' + ocrData.length);
        tempCluster = await Chinese(ocrData[imageNumber]);
        console.log('getting chinese' + imageNumber);
//console.log(tempCluster[tempCluster.length - 1]);
        cluster[0] += tempCluster[tempCluster.length - 1];
        cluster.push(tempCluster);
      }
    }
    const translatedText = await translate(cluster[0]);
    //console.log(translatedText);
    for(let imageNumber = 1,translatedIndex = 0; imageNumber < cluster.length ; imageNumber++) {
      for(clusterNumber = 0; clusterNumber < cluster[imageNumber].length -1; clusterNumber++){
        cluster[imageNumber][clusterNumber].clusterText = translatedText[translatedIndex];
        translatedIndex++;
      }
    }
    //console.log(scrapData.chapterLink);
    //cluster.splice(0,1);
   // console.log(scrapData.chapterLink.length);
   // console.log(cluster[0]);
    //console.log(cluster[5]);
    const printedText = print(cluster,ocrData);
  } catch (error) {
    console.log('app' + error);
  }
})();