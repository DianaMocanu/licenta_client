import React from "react";
import '../css/table.css'

function Table(props){

    const getTableColumns = () =>{
        return props.columns.map((col, index) => {
            return(
                <th className="columns" key={index}>{col}</th>
            );
        })
    };
    const getTableBody = () =>{
        return props.results.map((col, index)=>{
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
    };

    return(
        <div className="tableDiv">
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
