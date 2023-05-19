import React from 'react'
import UploadButton from './UploadButton';

const Main = () => {
  return (
    <div className='container'>
        <div className='header'>
            <a href='#'>
                <img src='/uploader_logo.png' alt='logo' />
            </a>
            <h2>The simple File Uploader</h2>
            <UploadButton />
        </div>
        <div className='content'>
            <p>Share files with X-Upload - the Privacy Oriented file host.</p>
            <p>Max 20 GB per file.</p>
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