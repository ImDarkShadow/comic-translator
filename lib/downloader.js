const stream = require('stream');
const {promisify} = require('util');
const fs = require('fs');
const got = require('got');

const pipeline = promisify(stream.pipeline);

const download = async (chapterLink) => {
  try{
    for (imageNumber = 0; imageNumber < chapterLink.length; imageNumber++){
      await pipeline(
        got.stream(chapterLink[imageNumber]),
        fs.createWriteStream(`./images/${imageNumber+1}.jpg`)
      );
    }
  }catch (error) {

  }

};
module.exports = download;