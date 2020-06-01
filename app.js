const prompt = require('prompt-sync');
const scrap = require('./lib/scrap');
const Ocr = require('./lib/ocr');
const Chinese = require('./language/chinese');
let comicLink = 'https://rawdevart.com/comic/against-gods/chapter-185/';
let apiKey = 'ca9d212ae488957';
let comicLanguage = 'chs';
(async () => {
  try {
  let scrapData = await scrap(comicLink);
  //console.log(scrapData.chapterLink);
  let ocrData = await Ocr(apiKey,comicLanguage,scrapData.chapterLink);
    //console.log(ocrData[0]);
  let cluster = Chinese(ocrData[0]);
  console.log(cluster);

  } catch (error) {
    console.log('app' + error);
  }
})();