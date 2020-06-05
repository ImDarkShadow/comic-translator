const chinese = async (ocrData) => {
  try {
    let cluster = [];
    let lines = ocrData.ParsedResults[0].TextOverlay.Lines;
    let length = lines.length;
    console.log(length);
    let clusterIndex = [] ;
    let tempClusterObj = {
      clusterText : '',
      left : 99999,
      top : 99999,
      right : 0,
      down : 0
    };
    let avgHeight = 0,imageText = '';
    for (let idx = 0; idx < lines.length; idx++) {
      avgHeight += lines[idx].MaxHeight;
    }
    avgHeight = avgHeight / lines.length * 1.5;
    for (let idx = 0; idx < lines.length; idx++) {

      if (avgHeight < lines[idx].MaxHeight) {
        lines.splice(idx, 1);

      }
    }
    for (let idx = 0; idx < lines.length - 1; idx++) {

      if ((lines[idx].Words[lines[idx].Words.length - 1].WordText) !== '．' && (lines[idx].Words[lines[idx].Words.length - 1].WordText) !== '！' && (lines[idx].Words[lines[idx].Words.length - 1].WordText) !== '？' && (lines[idx].Words[lines[idx].Words.length - 1].WordText) != '。' && (lines[idx].Words[lines[idx].Words.length - 1].WordText) != '“') {
console.log('if-----'+idx);
        if ((lines[idx].MinTop + lines[idx].MaxHeight * 2) > lines[idx + 1].MinTop && lines[idx].Words[lines[idx].Words.length - 1].Left + lines[idx].MaxHeight * 2 > lines[idx+1].Words[0].Left) {

        } else {
          console.log('if-----else'+idx);
          clusterIndex.push(idx);
        }
      } else {
        if ((lines[idx].MinTop + lines[idx].MaxHeight * 2 < lines[idx + 1].MinTop)  || ((lines[idx].Words[0].Left + lines[idx].MaxHeight * 2) < lines[idx + 1].Words[0].Left)) {
          clusterIndex.push(idx);
          console.log('else-----if'+idx);
        }
      }
    }
    console.log(clusterIndex);

    for (let lineNumber = 0, idx = 0; lineNumber < lines.length; lineNumber++) {
      if (clusterIndex[idx] === lineNumber || lineNumber === lines.length - 1) {
        if(lines[lineNumber].MinTop > tempClusterObj.down){
          tempClusterObj.down = lines[lineNumber].MinTop;
          tempClusterObj.down += lines[lineNumber].MaxHeight;
        }
        if(lineNumber === lines.length - 1 || clusterIndex[idx] === lineNumber){
          if(lines[lineNumber].MinTop < tempClusterObj.top){
            tempClusterObj.top = lines[lineNumber].MinTop;
          }
          if(lines[lineNumber].Words[0].Left < tempClusterObj.left){
            tempClusterObj.left = lines[lineNumber].Words[0].Left;
          }
          if(lines[lineNumber].Words[lines[lineNumber].Words.length -1].Left > tempClusterObj.right){
            tempClusterObj.right = lines[lineNumber].Words[lines[lineNumber].Words.length -1].Left;
            tempClusterObj.right += lines[lineNumber].MaxHeight;
          }
        }
        tempClusterObj.clusterText += lines[lineNumber].LineText;
        imageText += tempClusterObj.clusterText + '\n';
        cluster[idx] = {};
        Object.assign(cluster[idx],tempClusterObj);

        tempClusterObj.clusterText = '';
        tempClusterObj.top = 99999;
        tempClusterObj.left = 99999;
        tempClusterObj.right = 0;
        tempClusterObj.down = 0;

        idx++;

      } else {
        if(lines[lineNumber].MinTop < tempClusterObj.top){
          tempClusterObj.top = lines[lineNumber].MinTop;
        }
        if(lines[lineNumber].Words[0].Left < tempClusterObj.left){
          tempClusterObj.left = lines[lineNumber].Words[0].Left;
        }
        if(lines[lineNumber].Words[lines[lineNumber].Words.length -1].Left > tempClusterObj.right){
          tempClusterObj.right = lines[lineNumber].Words[lines[lineNumber].Words.length -1].Left;
          tempClusterObj.right += lines[lineNumber].MaxHeight;
        }
        tempClusterObj.clusterText += lines[lineNumber].LineText;
      }
    }
    //for (let lineNumber = 0, idx = 0; lineNumber < lines.length; lineNumber++) {
//console.log(imageText.split('\n'));
   // }
    cluster.push(imageText);
    console.log(cluster);
    console.log(clusterIndex);
    return cluster;

  } catch (error) {
    console.log('ch' + error);

  }
};
module.exports = chinese;