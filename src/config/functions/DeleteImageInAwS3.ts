import dotenv from 'dotenv'
import { response } from 'express';
import aws from 'aws-sdk';

dotenv.config();

export function DeleteImageInAwS3(key:string) {
       
         //@ts-expect-error     
        const s3 = new aws.S3();
         s3.deleteObject({
            Bucket:process.env.AWS_IMAGES_BUCKET_NAME,
            Key:key,
            
        },
        function (err, data){
            if(err){
                console.log(err, err.stack)
                process.exit(0)
            }else{
                data
            }
        }
        );
        
   
};