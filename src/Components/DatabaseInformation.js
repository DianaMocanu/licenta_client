import React, {useState} from 'react';
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Button from "react-bootstrap/Button";
import FormLabel from "@material-ui/core/FormLabel";
// import {Button, ButtonGroup, FormLabel} from "@material-ui/core";
import DropdownClearable from "./DropdownC";
import axios from "axios";
import {NotificationContainer, NotificationManager} from "react-notifications";


function DatabaseInformation(props){

    const [existTables, setExistTablesState] = useState(false);
    const [tables, setTablesState] = useState([]);
    const [columns, setColumnsState] = useState([]);
    const [columnsExist, setColExistState] = useState(false);


    const constructTablesOptions =  (tables) =>{
        let options = [];
        tables.forEach((value, index)=>{
            options.push({
                key: index,
                text: value,
                value: index
            })
        });
        return options;

    };

    const databaseIsSelected = async (database) =>{
        if(database.length > 0) {
            const Data = {
                database: database
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            await axios.post(`http://127.0.0.1:5000/tables`, {Data}, config).then(response => {
                if (response.status === 209) {
                    NotificationManager.error(response.data, "", 4000);
                } else if (response.status === 200) {
                    console.log(response.data);
                    setExistTablesState(true);
                    const options = constructTablesOptions(response.data);
                    setTablesState(options);
                }
            }).catch(error => {
                NotificationManager.error('Status code 500', "", 3000);
            });
        }
        else{
            setExistTablesState(false);
        }
    };

    return(
        <div className="showCategoryDiv">
            <FormLabel>
                Databases:
             <DropdownClearable onSelected = {databaseIsSelected} options={[{key:1, text: "iris", value:1 }]}/>
            </FormLabel>
            <FormLabel>
                Tables:
                {existTables ?
                    <DropdownClearable options ={ tables}/>
                :null}
            </FormLabel>
            <NotificationContainer/>

            <FormLabel>
                Columns:
                {columnsExist ? <div>Col</div>
                    : null
                }
            </FormLabel>
        </div>
    );

}
export default DatabaseInformation