import React from 'react';
import "../css/result.css"

function Result(props){

    return (
        <div className="resultDiv">
            <span className="inputQuery" id="result">{props.result}</span>
            <button className="appButtons">Run Query</button>
        </div>
    );
}

export default Result
