const Parse = require('parse');

Parse.initialize('7Lvyr951Bg');
Parse.serverURL = 'https://api.formcharm.com/1';

export default function sendMail(messageObject, callback) {
  Parse.Cloud.run('a27Send', { data: messageObject }).then((result) => {
      // make sure the set the enail sent flag on the object
      console.log("result :" + JSON.stringify(result))
  }, (error) => {
      // error
      console.log("error :" + JSON.stringify(error))
  });
}
