import React from "react";
import '../css/table.css'
import {Table} from "semantic-ui-react";

function TablePopup(props) {

    const getTableColumns = () => {
        return props.columns.map((col, index) => {
            return (
                <Table.HeaderCell key={index}>{col}</Table.HeaderCell>
            );
        })
    };
    const getTableBody = () => {
        return props.results.map((col, index) => {
            return (
                <Table.Row key={index}>
                    {
                        col.map((item, indexV) => {
                            return (
                                <Table.Cell key={index.toString() + indexV.toString()}>{item}</Table.Cell>
                            );
                        })
                    }
                </Table.Row>
            );
        })
    };

    return (
        <div className="tableDiv">
            <img
                id="close_btn"
                src={require("../images/close_btn.png")}
                alt="close button"
                onClick={props.closePopup}
            />
            {/*<div id="close_btn"><Button small circular icon="close" onClick={props.closePopup}/></div>*/}
            <div id="scroolable">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                    {getTableColumns()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {getTableBody()}
                </Table.Body>
            </Table>
            </div>
        </div>
    );
}

export default TablePopup
