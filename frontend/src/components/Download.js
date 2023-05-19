import React from 'react'
import DownloadButton from './DownloadButton';
import { useParams } from 'react-router-dom';

const Main = () => {

    const Params = useParams();

    console.log(Params);

    return (
        <div className='container'>
            <div className='header'>
                <a href='#'>
                    <img src='/uploader_logo.png' alt='logo' />
                </a>
                {/* <h2>{{}}</h2> */}
                <DownloadButton filename={Params.filename}/>
            </div>
            <div className='footer'>
                <div></div>
                <div className='bottom'>
                    <p><a>Terms of Use</a> - <a>API</a> - <a>FAQ</a> - <a>Feedback</a> - <a>REPORT ABUSE</a></p>
                </div>
            </div>
        </div>
    )
}

export default Main