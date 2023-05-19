import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BaseUrl } from '../../config/key';

function DownLoad({ filename }) {

    const [fileName, setFileName] = useState(filename.split('.')[1] + "." + filename.split('.')[filename.split('.').length-1]);
    const [size, setSize] = useState("");
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        axios.get(`${BaseUrl}/file/getSize/${filename}`)
            .then(res => {
                res.data.size > 1024 * 1024 ?
                    setSize((res.data.size / 1024 / 1024).toFixed(2) + "MB") :
                    setSize((res.data.size / 1024).toFixed(2) + "KB");
            })
            .catch(err => console.log(err))
    }, [])

    async function handleSubmit() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${BaseUrl}/files/${filename}`, true);
        xhr.responseType = 'blob';

        xhr.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total * 100;
                setLoading(percentComplete);
                // Update progress UI here
            }
        });

        xhr.onload = () => {
            const url = window.URL.createObjectURL(xhr.response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            setLoading(false);
        };

        xhr.send();
    }

    useEffect(() => {
        console.log(loading);
    }, [loading])

    return (
        <>
            <h2>{fileName}</h2>
            <button className='upload_button' onClick={handleSubmit}>
                DownLoad( {size} )
            </button>
            {(loading > 0 && loading < 100 ) &&
                <div>
                    <p>{loading.toFixed(0)}%</p>
                    <progress max="100" value={loading}>
                        {loading}%
                    </progress>
                </div>
            }
            {
                (loading === 100 || loading === false) &&
                <div>
                    <p>100% Download complete</p>
                    <progress max="100" value={'100'}>
                        100%
                    </progress>
                </div>
            }
        </>
    )
}

export default DownLoad;