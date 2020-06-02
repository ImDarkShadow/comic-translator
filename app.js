const prompt = require('prompt-sync');
const scrap = require('./lib/scrap');
const Ocr = require('./lib/ocr');
const Chinese = require('./language/chinese');
const  translate = require('./lib/translate')
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
    console.log(translatedText);

  } catch (error) {
    console.log('app' + error);
  }
})();