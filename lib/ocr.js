const got = require('got');
const Ocr = async (apiKey,comicLanguage,chapterLink) => {
  try {
    let data = [],tempOcrData,tempObj;
    for(let chapterNumber =0; chapterNumber <= 1; chapterNumber++) {
      tempOcrData =await got(`https://api.ocr.space/parse/imageurl?apikey=${apiKey}&url=${chapterLink[chapterNumber]}&language=${comicLanguage}&isOverlayRequired=true`);
      tempObj = JSON.parse(tempOcrData.body);
      data.push(tempObj);
    }
  return data;
  } catch (error) {
    console.log(error);

  }

};
module.exports = Ocr;