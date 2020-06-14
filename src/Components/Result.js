import React, {useState} from 'react';
import "../css/result.css"
import 'react-notifications/lib/notifications.css';
import {Button} from "semantic-ui-react";

function Result(props){
    // eslint-disable-next-line no-unused-vars
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
            <textarea placeholder='generated query' className="inputQuery" id="result" value={props.result} onChange={handleChange}/>
            <Button className="color1" size="medium" onClick={clickRunQuery}>Execute</Button>
        </div>
    );
}

export default Result
