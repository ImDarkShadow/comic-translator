const got = require('got');
const Ocr = async (apiKey,comicLanguage,chapterLink) => {
  try {
    let data = [],tempOcrData,tempObj;
    for(let chapterNumber =1; chapterNumber < 12; chapterNumber++) {
      console.log('getting ocr'+chapterNumber );
      tempOcrData =await got(`https://api.ocr.space/parse/imageurl?apikey=${apiKey}&url=${chapterLink[chapterNumber]}&language=${comicLanguage}&isOverlayRequired=true&scale=true`);
      console.log('got ocr'+chapterNumber );
      tempObj = JSON.parse(tempOcrData.body);
      data.push(tempObj);

    }
  return data;
  } catch (error) {
    console.log('ocr ' + error);

  }

};
module.exports = Ocr;