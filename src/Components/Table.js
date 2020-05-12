import React from "react";
import '../css/table.css'

function Table(props){

    const getTableColumns = () =>{
        return props.columns.map((col, index) => {
            return(
                <th className="columns" key={index}>{col}</th>
            );
        })
    }
    const getTableBody = () =>{
        return props.results.map((col, index)=>{
            console.log(col)
            return(
                <tr key={index}>
                    {
                        col.map((item, indexV) => {
                            return(
                                <td key={index.toString() + indexV.toString()}>{item}</td>
                            );
                        })
                    }
                </tr>
            );
        })
    }

    return(
        <div className="tableDiv">
            {/*<img*/}
            {/*    id="close_btn"*/}
            {/*    src={require("../images/close_btn.png")}*/}
            {/*    alt="close button"*/}
            {/*    onClick={props.closePopup}*/}
            {/*/>*/}
            <table className="tableMain">
                <tbody>
                <tr>
                    {getTableColumns()}
                </tr>
                {getTableBody()}
                </tbody>
            </table>

        </div>
    );
}

export default Table
