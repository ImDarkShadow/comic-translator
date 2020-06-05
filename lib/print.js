const  Jimp = require('jimp');
const print = async (cluster,chapterLink) => {
  try {
    console.log('top print -------');
    //let image = await Jimp.read('./output/004.jpg');
    for(imageNumber = 1; imageNumber < cluster.length; imageNumber++) {
      console.log(imageNumber);
      let image = await Jimp.read(`./images/${imageNumber+1}.jpg`);
      console.log('for outer '+imageNumber+ 'print -------');
      for(clusterNumber = 0; clusterNumber < cluster[imageNumber].length - 1; clusterNumber++) {
        let blankImage = await new Jimp((cluster[imageNumber][clusterNumber].right - cluster[imageNumber][clusterNumber].left), (cluster[imageNumber][clusterNumber].down - cluster[imageNumber][clusterNumber].top), '#ffffff')
        //blankImage.write('img.jpg');
        console.log('for '+ clusterNumber + 'print -------');
        //let image = await Jimp.read(chapterLink[3]);
        image = image.blit(blankImage, cluster[imageNumber][clusterNumber].left, cluster[imageNumber][clusterNumber].top);
        image.write('./output/004.jpg');
        //let length = cluster.clusterText.length;
        //console.log(length);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        image.print(
          font,
          cluster[imageNumber][clusterNumber].left,
          cluster[imageNumber][clusterNumber].top,
          cluster[imageNumber][clusterNumber].clusterText,
          cluster[imageNumber][clusterNumber].right - cluster[imageNumber][clusterNumber].left);
        //const imagel = await Jimp.read(1000, 1000, 0x0000ffff);

        //console.log('lklkl' + Jimp.measureText(font, 'Hello World!'));
       // console.log('before write -------');
       // await image.write('./output/004.jpg');
       // console.log('before print -------');
       // image = await Jimp.read('./output/004.jpg');
       // console.log('after print -------');
      }
      await image.write('./output/'+imageNumber + '.jpg');
    }
    // return
  } catch (error) {
    console.log(error);

  }
};
module.exports = print;