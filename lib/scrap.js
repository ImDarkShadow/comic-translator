const got = require('got');
let cheerio = require('cheerio');
let cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio);
const scrap = async (comicLink) => {
  try {
    const response = await got(comicLink);
    const $ = cheerio.load(response.body);
    let tempChapterLink = $('div > img').attr('data-src');
    console.log(tempChapterLink);
    let chapterLenth = $('div > img').length;
    tempChapterLink = tempChapterLink.slice(0, -7);
  /*  let str ='' + $('script').eq(14);
    let lines = str
      .slice(54,-14)
      .trim()
      .split(",");
    let obj = {};
    let line, key, value;
    for (let idx = 0; idx < lines.length; idx++) {
      line = lines[idx].replace("\n", "").trim().split(":");
      if (line.length === 2) {
        key = line[0].trim()
        value = line[1].trim();
        value = value.substr(1, value.length - 2);
        obj = { ...obj, [key]: value };
      }
    }
    let chapterListApi = 'https://rawdevart.com' + obj.series;*/
    let chapterLink = [],chapterList = [];
    for(let imageNumber = 1; imageNumber <= chapterLenth; imageNumber++){
      if(imageNumber < 10){
        chapterLink.push(tempChapterLink + '00' + imageNumber + '.jpg');
      }else if(imageNumber > 9 && imageNumber < 100){
        chapterLink.push(tempChapterLink + '0' + imageNumber + '.jpg');
      }else{
        chapterLink.push(tempChapterLink + imageNumber + '.jpg');
      }
    }
    /*let chapterListObj = await got(chapterListApi);
    chapterListObj = JSON.parse(chapterListObj.body);
  for(let chapterNumber =0; chapterNumber < chapterListObj.count; chapterNumber++){
    chapterList.push(chapterListObj.results[chapterNumber].slug);
  }*/
    const scrapData ={
      //chapterList : chapterList,
      chapterLink : chapterLink
    }

    return scrapData;

  } catch (error) {
    console.log('scrap' + error);

  }

};
module.exports = scrap;