const prompt = require('prompt-sync');
const scrap = require('./lib/scrap')
let comicLink = 'https://rawdevart.com/comic/against-gods/chapter-185/';
let apiKey = 'ca9d212ae488957';
let comicLanguage = 'chs';
(async () => {
  try {
  let scrapData = scrap(comicLink);
  } catch (error) {
    console.log(error);
  }
})();