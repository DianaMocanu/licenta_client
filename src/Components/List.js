import React from 'react';
import "../css/list.css"
function List(props){
    return(
        <div className="listDiv">{props.results}</div>
    );
}

export default List
