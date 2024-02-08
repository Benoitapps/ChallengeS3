import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function GetPdf({file, viewPdf}) {


    const newplugin = defaultLayoutPlugin();

    return(
        <div className="pdf">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {viewPdf && <> <Viewer fileUrl={file} plugins={[newplugin]} /> </> }
            </Worker>
        </div>
    );

}
export default GetPdf;

