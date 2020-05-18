import React from 'react';
import "../css/result.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Result(props){

    const clickRunQuery = () => {
        console.log("Here")
        NotificationManager.info('This feature is not implemented yet',"", 3000);
    }
    return (
        <div className="resultDiv">
            <textarea className="inputQuery" id="result" value={props.result}/>
            <button className="appButtons" onClick={clickRunQuery}>Run Query</button>
            <NotificationContainer/>
        </div>
    );
}

export default Result
