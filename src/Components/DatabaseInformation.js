import React, {useState} from 'react';
import FormLabel from "@material-ui/core/FormLabel";
import DropdownClearable from "./DropdownClearable";
import {NotificationContainer, NotificationManager} from "react-notifications";
import AnimatedList from "./AnimatedList";
import Requests from "./Requests";


function DatabaseInformation(props) {

    const [existTables, setExistTablesState] = useState(false);
    const [databaseName, setDatabase] = useState("");
    const [tables, setTablesState] = useState([]);
    const [columns, setColumnsState] = useState([]);
    const [columnsExist, setColExistState] = useState(false);


    const constructOptions = (elements) => {
        let options = [];
        elements.forEach((value, index) => {
            options.push({
                key: index,
                text: value,
                value: index
            })
        });
        return options;

    };

    const databaseIsSelected = async (database) => {
        if (database.length > 0) {
            setDatabase(database);
            const Data = {
                database: database
            };
            const response = await Requests.create(`tables`, Data)
            if (response.ok && response.status === 200) {
                setExistTablesState(true);
                const options = constructOptions(response.data);
                setTablesState(options);
            } else {
                NotificationManager.error(response.data, "", 4000);
            }
        } else {
            setExistTablesState(false);
            setColExistState(false);
            setDatabase("");
        }
    };

    const tableIsSelected = async (table) => {
        if (table.length > 0) {
            const Data = {
                table: table,
                database: databaseName
            };

            const response = await Requests.create(`columns`, Data)
            if (response.ok && response.status === 200) {
                setColumnsState(response.data);
                setColExistState(true);
            } else {
                NotificationManager.error(response.data, "", 4000);
            }
        } else {
            setColExistState(false);
        }
    }

    return (
        <div className="showCategoryDiv">
            <FormLabel>
                Databases:
                <DropdownClearable onSelected={databaseIsSelected} options={[{key: 1, text: "iris", value: 1}]}/>
            </FormLabel>
            <FormLabel>
                Tables:
                {existTables ?
                    <DropdownClearable onSelected={tableIsSelected} options={tables}/>
                    : null}
            </FormLabel>
            <NotificationContainer/>
            <FormLabel>
                Columns:
                {columnsExist ? <AnimatedList columns={columns}/>
                    : null
                }
            </FormLabel>
        </div>
    );

}

export default DatabaseInformation
