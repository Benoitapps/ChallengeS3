import {Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {useState} from "react";

function GetPdf({file, viewPdf, header}) {
    const [visible, setVisible] = useState(true);
    const newplugin = defaultLayoutPlugin();

    return(<>
        { viewPdf && visible ? <div className="pdf">
            {header && <div className="pdf__head">
                    <svg className="close" onClick={() => {setVisible(false)}} width="35" height="35" fill="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 7.05 16.95 6 12 10.95 7.05 6 6 7.05 10.95 12 6 16.95 7.05 18 12 13.05 16.95 18 18 16.95 13.05 12 18 7.05Z"></path>
                    </svg>
                </div>
            }
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={file} plugins={[newplugin]}/>
                </Worker>
            </div> : null
        }
    </>);

}

export default GetPdf;

