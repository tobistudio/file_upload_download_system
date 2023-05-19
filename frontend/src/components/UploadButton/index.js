import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineCopy } from 'react-icons/ai';
import axios from 'axios';
import { notification } from 'antd';
import { BaseUrl, BaseFrontUrl } from '../../config/key';

function UploadButton() {

    const [file, setFile] = useState(null);
    const [uploadingFile, setUploadingFile] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    React.useEffect(() => {
        file && handleSubmit()
    }, [file])

    const fileUpload = (e) => {
        e.preventDefault();

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.addEventListener("change", (event) => {
            setFile(event.target.files[0]);
        });
        fileInput.click();
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${BaseUrl}/upload`, formData, {
            onUploadProgress: (progressEvent) => {
                const percentageCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentageCompleted);
            },
        });
        const data = await response.data;
        if (data) {
            setUploadingFile([data.message, ...uploadingFile]);
        }
    }


    return (
        <>
            <button className='upload_button' onClick={fileUpload}>
                <BsCloudUpload />
                <label>UPLOAD</label>
                <BsCloudUpload />
            </button>
            {( uploadProgress > 0 && uploadProgress < 100 ) && (
                <>
                    <p>{ file.name }</p>
                    <progress max="100" value={uploadProgress}>
                        {uploadProgress}%
                    </progress>
                </>
            )}
            {
                uploadingFile.map((ele, i) =>
                    <div key={i}>
                        <h4>{ele.originalname}</h4>
                        <div className='copy_board'>
                            <span className='copy' 
                            onClick={() => {
                                document.getElementsByClassName('noti')[i].style.display = "block";
                                const copyInput = document.createElement('input');
                                copyInput.type = 'text';
                                copyInput.value = `${BaseFrontUrl}/download/` + ele.filename;

                                document.body.appendChild(copyInput);
                                copyInput.select();
                                document.execCommand('copy');
                                document.body.removeChild(copyInput);
                            }}
                            onMouseLeave={() =>  document.getElementsByClassName('noti')[i].style.display = "none"}
                            ><AiOutlineCopy />copy<span className='noti' >copied</span></span>
                            
                            <input type='text' value={`${BaseFrontUrl}/download/` + ele.filename} />
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default UploadButton;