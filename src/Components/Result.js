import React from 'react';
import "../css/result.css"
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Result(props){

    const clickRunQuery = () => {
        NotificationManager.info('This feature is not implemented yet',"", 3000);
    };
    return (
        <div className="resultDiv">
            <textarea className="inputQuery" id="result" value={props.result} onChange={null}/>
            <button className="appButtons" onClick={clickRunQuery}>Run Query</button>
        </div>
    );
}

export default Result
