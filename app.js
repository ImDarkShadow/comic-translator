const prompt = require('prompt-sync');
const scrap = require('./lib/scrap');
const Ocr = require('./lib/ocr');
const Chinese = require('./language/chinese');
const translate = require('./lib/translate');
const print = require('./lib/print');
let comicLink = 'https://rawdevart.com/comic/against-gods/chapter-185/';
let apiKey = 'ca9d212ae488957';
let comicLanguage = 'chs';
(async () => {
  try {
  let scrapData = await scrap(comicLink);
  //console.log(scrapData.chapterLink);
  let ocrData = await Ocr(apiKey,comicLanguage,scrapData.chapterLink);
    //console.log(ocrData[0]);
    let cluster = [''],tempClusterObj = {};
    //cluster[0] = '';
    for(let imageNumber = 0; imageNumber < ocrData.length; imageNumber++) {
      tempCluster =await Chinese(ocrData[imageNumber]);
//console.log(tempCluster[tempCluster.length - 1]);
      cluster[0] += tempCluster[tempCluster.length - 1];
      cluster.push(tempCluster);

    }
    const translatedText = await translate(cluster[0]);
    //console.log(translatedText);
    for(let imageNumber = 1,translatedIndex = 0; imageNumber < cluster.length ; imageNumber++) {
      for(clusterNumber = 0; clusterNumber < cluster[imageNumber].length -1; clusterNumber++){
        cluster[imageNumber][clusterNumber].clusterText = translatedText[translatedIndex];
        translatedIndex++;
      }
    }
    //console.log(cluster[1][0])
    //cluster.splice(0,1);
    //console.log(cluster[1]);
    const printedText = print(cluster,scrapData.chapterLink);
  } catch (error) {
    console.log('app' + error);
  }
})();