import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import multerS3 from 'multer-s3'
import aws from "aws-sdk";
import Crypto from 'crypto'

dotenv.config();

const storageTypes = {
    local: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'uploads', 'posts'),
        filename: function (req, file, cb) {
            const keyId = Crypto.randomBytes(3).toString('hex');
            //@ts-expect-error
            file.key = `${keyId}-${file.originalname}`; //@ts-expect-error
            cb(null, file.key);
        },
    }),
    s3: multerS3({
        //@ts-expect-error
        s3: new aws.S3(),//@ts-expect-error
        bucket: process.env.AWS_IMAGES_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const keyId = Crypto.randomBytes(3).toString('hex')
            cb(null, `${keyId}-${file.originalname}`)
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