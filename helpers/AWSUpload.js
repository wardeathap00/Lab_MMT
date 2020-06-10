//thư viện upload data lên AWS S3 bucket
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// AWS.config.update({
//     accessKeyId: 'AKIAJ4VHIRCLTWKE6WBQ',
//     secretAccessKey: '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',
//     region: 'eu-central-1',
//     signatureVersion: 'v4'
// });

// const a = new AWS.S3({
//     accessKeyId: 'AKIAJ4VHIRCLTWKE6WBQ',
//     secretAccessKey: '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',
//     bucket: 'LAB_MMT'
// });

// const upload = multer({
//     storage: multerS3({
//         S3: a,
//         bucket: 'LAB_MMT',
//         acl: 'public-read',
//         metadata(req, file, cb){
//             cb(null, {fieldName: file.fieldname});
//         },
//         key(req, file, cb){
//             cb(null, file.originalname);
//         },

//         rename(fieldName, fileName){
//             return fieldName.replace(/\W+/g, '-');
//         }
//     })
// });

// exports.Upload = upload;