const chinese = async (ocrData) => {
  try {
    let cluster = [];
    let lines = ocrData.ParsedResults[0].TextOverlay.Lines;
    let length = lines.length;
    console.log(length);
    let clusterIndex = [] ;
    let tempClusterObj = {
      clusterText : '',
      left : 0,
      top : 0,
      right : 0,
      down : 0
    };
    let avgHeight = 0;
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

        if ((lines[idx].MinTop + lines[idx].MaxHeight * 2) > lines[idx + 1].MinTop && lines[idx].Words[lines[idx].Words.length - 1].Left + lines[idx].MaxHeight * 2 > lines[idx].Words[0].Left) {

        } else {
          clusterIndex.push(idx);
        }
      } else {
        if ((lines[idx].MinTop + lines[idx].MaxHeight * 2 < lines[idx + 1].MinTop) || ((lines[idx].Words[0].Left + lines[idx].MaxHeight * 2) < lines[idx + 1].Words[0].Left)) {
          clusterIndex.push(idx);
        }
      }
    }
    console.log(clusterIndex);

    for (let lineNumber = 0, idx = 0; lineNumber < lines.length; lineNumber++) {
      if (clusterIndex[idx] === lineNumber || lineNumber === lines.length - 1) {



        tempClusterObj.clusterText += lines[lineNumber].LineText;
        // console.log(tempClusterObj.clusterText);
        cluster[idx] = {};
        Object.assign(cluster[idx],tempClusterObj);
        //console.log(tempClusterObj.clusterText);
        tempClusterObj.clusterText = '';

        idx++;

      } else {
        tempClusterObj.clusterText += lines[lineNumber].LineText;
      }
    }
    return cluster;

  } catch (error) {
    console.log('ch' + error);

  }
};
module.exports = chinese;