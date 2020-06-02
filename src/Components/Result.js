import React from 'react';
import "../css/result.css"
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Button} from "semantic-ui-react";

function Result(props){

    const clickRunQuery = () => {
        NotificationManager.info('This feature is not implemented yet',"", 3000);
    };
    return (
        <div className="resultDiv">
            <textarea className="inputQuery" id="result" value={props.result} onChange={null}/>
            <Button className="color1" size="medium" onClick={clickRunQuery}>Execute</Button>
        </div>
    );
}

export default Result
