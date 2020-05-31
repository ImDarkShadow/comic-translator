const prompt = require('prompt-sync');
const scrap = require('./lib/scrap')
const Ocr = require('./lib/ocr')
let comicLink = 'https://rawdevart.com/comic/against-gods/chapter-185/';
let apiKey = 'ca9d212ae488957';
let comicLanguage = 'chs';
(async () => {
  try {
  let scrapData = await scrap(comicLink);
  let ocrData = await Ocr(apiKey,comicLanguage,scrapData.chapterLink);
  console.log(ocrData[0]);

  } catch (error) {
    console.log('app' + error);
  }
})();