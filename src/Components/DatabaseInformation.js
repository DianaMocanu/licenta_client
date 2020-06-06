import React, {useState} from 'react';
import FormLabel from "@material-ui/core/FormLabel";
import DropdownClearable from "./DropdownClearable";
import {NotificationContainer, NotificationManager} from "react-notifications";
import AnimatedList from "./AnimatedList";
import Requests from "./Requests";
import {Checkbox, Container, Divider, Header} from "semantic-ui-react";


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

    const databaseIsSelected = async (database, key) => {
        props.databaseIsChanged(database);
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

    const tableIsSelected = async (table, key) => {
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

    const negationIsSelected = (negation, key) => {
        if(typeof key === "string")
            key = 0
            props.negationIsSelected(key)
    }
    const checkCheckBox = (event, ch) => {
        const isChecked = ch.checked;
        props.chartCheckboxChange(isChecked)

    }
    return (
        <div className="showCategoryDiv">
            <Container textAlign='left' fluid>
                <Header as="h2">Generate Selections</Header>
                <FormLabel>
                    <span className="labelName">Negations:</span>
                    <DropdownClearable onSelected={negationIsSelected}
                                       options={[{key: 1, text: "negation1", value: 1}, {
                                           key: 2,
                                           text: "negation2",
                                           value: 2
                                       }]}/>
                </FormLabel>
                <Divider/>
                <FormLabel>
                    <span className="labelName">Databases:</span>
                    <DropdownClearable onSelected={databaseIsSelected} options={[{key: 1, text: "iris", value: 1},{key: 2, text: "htru", value: 2}]}/>
                </FormLabel>
                <Divider/>
                <FormLabel>
                    <Checkbox onChange={checkCheckBox}/> Generate Chart
                </FormLabel>
            </Container>

            <br/>
            <Container textAlign='left' fluid>
                <Header as="h2">Explore a database</Header>
                <Divider/>
                <FormLabel>
                    <span className="labelName">Tables:</span>
                    {existTables ?
                        <DropdownClearable onSelected={tableIsSelected} options={tables}/>
                        : null}
                </FormLabel>
                <Divider/>
                <NotificationContainer/>
                <FormLabel>
                    <span className="labelName">Columns:</span>
                    {columnsExist ? <AnimatedList columns={columns}/>
                        : null
                    }
                </FormLabel>
                <Divider/>
            </Container>
        </div>
    );

}

export default DatabaseInformation
