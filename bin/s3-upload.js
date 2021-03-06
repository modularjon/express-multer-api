'use strict';

const fs = require('fs');

const uploader = require('../lib/aws-s3-upload');

let filename = process.argv[2] || '';
//reminder: this is how you get stuff FROM the command line

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
     if (error) {
       reject(error);
     }

     resolve(data);
    });
  });
};

readFile(filename)
.then(uploader.prepareFile)
.then(uploader.awsUpload)
.then(console.log) //(data) => console.log(`${filename} is ${data.length} bytes long`))
.catch(console.error);
