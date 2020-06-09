//const got = require('got');
const ocrSpaceApi = require('ocr-space-api');
const Ocr = async (apiKey,comicLanguage,fileList) => {
  try {
    let options =  {
      apikey: apiKey,
      language: comicLanguage, // Português
      imageFormat: 'image/jpg', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
      isOverlayRequired: true,
      scale: true
    };

// Image file to upload
    //let imageFilePath = `./images/${fileList[chapterNumber]}`;

// Run and wait the result
    /*ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
      .then(function (parsedResult) {
        console.log('parsedText: \n', parsedResult.parsedText);
        console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
      }).catch(function (err) {
      console.log('ERROR:', err);
    });*/
    let data = [],tempOcrData,tempObj;
    for(let chapterNumber =0; chapterNumber < fileList.length; chapterNumber++) {
      console.log('getting ocr'+chapterNumber );
      /*tempOcrData =await got(`https://api.ocr.space/parse/imageurl?apikey=${apiKey}&url=${chapterLink[chapterNumber]}&language=${comicLanguage}&isOverlayRequired=true&scale=true`);*/
      // Image file to upload
      let imageFilePath = `./images/${fileList[chapterNumber]}`;

// Run and wait the result
     tempOcrData =await ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
       // .then(function (parsedResult) {
         // console.log('parsedText: \n', parsedResult.parsedText);
          console.log('ocrParsedResult: \n', typeof tempOcrData.ocrParsedResult);
          console.log('got ocr'+chapterNumber );
         // tempObj = JSON.parse(tempOcrData.ocrParsedResult);
          data.push(tempOcrData.ocrParsedResult);
        //}).catch(function (err) {
       // console.log('ERROR:', err);
     // });
     /* console.log('got ocr'+chapterNumber );
      tempObj = JSON.parse(tempOcrData.body);
      data.push(tempObj);*/

    }
  return data;
  } catch (error) {
    console.log('ocr ' + error);

  }

};
module.exports = Ocr;