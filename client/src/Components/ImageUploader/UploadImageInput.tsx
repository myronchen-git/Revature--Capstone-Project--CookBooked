import React, { useState } from 'react'
import AWS, { S3 } from 'aws-sdk';
import { useSelector } from 'react-redux';
import './ImageUploader.css';
import { RootState } from '../../store/store';


/**
 * Component to upload an image to AWS S3 bucket
 * <UploadImageInput tableName="accounts" updateProfile={updateProfile}/>
 * 
 * @param props tableName: name of table to send image URL (please add as a case in func sendImageUrl)
 * @param props updateDatabse: name of some function to send imageURL to specified DB
 * @returns component
 */

function UploadImageInput(props: any) {
    let username = useSelector((state: RootState) => state.user.username);
    const [file, setFile] = useState({name: ''});
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setFile(file);
    }

    async function uploadFile() {
        const S3_BUCKET = String(process.env.REACT_APP_S3_BUCKET); // CHANGE THIS
        const REGION = process.env.REACT_APP_REGION; // CHANGE THIS

        AWS.config.update({
            accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        });

        const s3 = new AWS.S3({
            params: {Bucket: S3_BUCKET},
            region: REGION
        })

        const params = {
            Bucket: S3_BUCKET,
            Key: `${username}-${file.name}`,
            Body: file,
        };
        console.log(params);

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

        sendImageUrl(props.tableName);
    }
    
    // send imageUrl to a different location based on props.tableName
    // add switch statement and axios method for individual tables as needed
    async function sendImageUrl(tableName: string) {
        const imageUrl = `https://test-image-bucket-rev.s3.us-west-1.amazonaws.com/${username}-${file.name}`
        switch(tableName) {
            case "accounts":
                props.updateDatabase("imageUrl", imageUrl);
                break;
            default:
                throw Error('Unable to send image URL to database');
        }
    }

  return (
    <div className="fileUpload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
    </div>
  )
}

export default UploadImageInput
