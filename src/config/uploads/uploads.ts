import dotenv from 'dotenv'
import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import Crypto from 'crypto';

dotenv.config();

const storageTypes = {
    local: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    s3: multerS3({
        //@ts-expect-error
        s3: new aws.S3(),
        bucket: 'laboticaupload',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const keyId = Crypto.randomBytes(3).toString('hex')
            cb(null, `${file.originalname}-${keyId}`)
            //The difference between image of posts 
            //and projects on s3 is that the keyId is 
            //correspondingly in front of or behind the 
            //original name
        },
    }),
};

export default {
    storage: storageTypes['s3'],
};