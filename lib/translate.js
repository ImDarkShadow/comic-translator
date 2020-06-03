const translate = require('@vitalets/google-translate-api');
const translation = async (textData) => {
   try {
     const result = await translate(textData, {
       tld: "com",
       to: "en"
     });
     console.log(result.text);
     //let x =result.text;
     //let j =x.split('\n');
     return result.text.split('\n');
    // return
   } catch (error) {
     console.log(error);

   }
 };
 module.exports = translation;