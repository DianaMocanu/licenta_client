import React, {useState} from 'react';
import "../css/result.css"
import 'react-notifications/lib/notifications.css';
import {Button, Header} from "semantic-ui-react";

function Result(props){
    const [query, setQuery] = useState('');


    const clickRunQuery = () => {
        props.clickExecute(props.result)
    };
    const handleChange = (event) =>{
        let newQuery = event.target.value;
       setQuery(newQuery);
    };
    return (
        <div className="resultDiv">
            <textarea className="inputQuery" id="result" value={props.result} onChange={handleChange}/>
            <Button className="color1" size="medium" onClick={clickRunQuery}>Execute</Button>
        </div>
    );
}

export default Result
