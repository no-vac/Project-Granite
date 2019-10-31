const AWS = require('aws-sdk');
const dotenv = require('dotenv')
dotenv.config();

const getLabels = async (image) =>{
  let list =[];
    // console.log(process.env.PORT);
    AWS.config.update({region: 'us-east-2', accessKeyId: 'AKIAWOYFVCGCY3GPJLFD', secretAccessKey: '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'});
    const client = new AWS.Rekognition();
    const params = {
      Image: {
        S3Object: {
          Bucket: image.Bucket,
          Name: image.Key
        },
      },
      MaxLabels: 10
    }
      await new Promise((resolve,reject) =>{
        client.detectLabels(params, function(err, response) {
          if (err) {
            console.log(err, err.stack); // an error occurred
            reject(err);
          } else {
            console.log(`Detected labels for: ${image.Key}`)
            response.Labels.forEach(async label => {
                  list.push(label.Name);     
            },
            resolve(list)
          )} 
        });
      })
    return list;
}
module.exports = {
  getLabels
}