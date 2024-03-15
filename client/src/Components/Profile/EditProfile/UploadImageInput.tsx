import React, { useState } from 'react'
import AWS, { S3 } from 'aws-sdk';

function UploadImageInput() {
    const [file, setFile] = useState({name: ''});
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setFile(file);
    }

    async function uploadFile() {
        const S3_BUCKET = "bucket-name"; // CHANGE THIS
        const REGION = "region"; // CHANGE THIS

        AWS.config.update({
            accessKeyId: '',
            secretAccessKey: '',
        });

        const s3 = new AWS.S3({
            params: {Bucket: S3_BUCKET},
            region: REGION
        })

        const params = {
            Bucket: S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        var upload: any = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                console.log(
                    "Uploading " + Number((evt.loaded * 100) / evt.total) + "%"
                );
            })
            .promise();
        
        await upload.then((err: any, data: any) => {
            console.log(err);
            alert("File uploaded successfully");
        });
    }   

  return (
    <>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
    </>
  )
}

export default UploadImageInput
