import React, {Component} from 'react';
import "../css/main.css"
import WriteQuery from "./WriteQuery";
import Result from "./Result";
import ListResult from "./ListResut";
import Table from "./Table";
import DatabaseInformation from "./DatabaseInformation";
import {NotificationManager} from "react-notifications";
import Requests from "./Requests";
import {Button, Container, Divider, Header} from "semantic-ui-react";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newQuery: "",
            initialQuery: "",
            results: [],
            columns: [],
            queryResults: [],
            showTableSection: false,
            showTable: false,
        };
    }

    getQueryFirstPart = query => {
        let whereIndex = query.toLowerCase().indexOf("where");
        return query.slice(0, whereIndex + 5)
    }

    constructDisjunctionCondition = resultIds => {
        console.log(resultIds);
        if (resultIds.length === 0) {
            let whereIndex = this.state.initialQuery.toLowerCase().indexOf("where");
            const newQuery = this.getQueryFirstPart(this.state.initialQuery).slice(0, whereIndex);
            this.setState({newQuery: newQuery});
            return;
        }

        let newCond = "";
        resultIds.forEach((id) => {
            let idInt = parseInt(id);
            newCond += "( " + this.state.results[idInt].value + ") or ";
        });

        const finalCond = newCond.slice(0, newCond.length - 3);
        const newQuery = this.getQueryFirstPart(this.state.initialQuery) + " " + finalCond;
        this.setState({newQuery: newQuery});
    };

    constructNewQuery = (query, condition) => {

        const first_part = this.getQueryFirstPart(query);
        return first_part + " " + condition
    };

    clickGenerate = async (query) => {
        const Data = {
            database: 'iris',
            query: query
        };
        this.setState({initialQuery: query});
        let result = await Requests.create('generate', Data)

        if (result.ok) {
            let data_result = result.data;
            let newQuery = this.constructNewQuery(query, data_result[0])
            let result_cond = [];
            data_result.forEach((row, index) => {
                if (index === 0)
                    result_cond[index] = {
                        checked: true,
                        value: row,
                    }
                else {
                    result_cond[index] = {
                        checked: false,
                        value: row,
                    }
                }
            });
            this.setState({newQuery: newQuery, results: result_cond});

        } else {
            NotificationManager.error(result.data, "", 4000);
        }

    };

    toggleTableSection = () => {
        this.setState(prevState => ({
            showTableSection: !prevState.showTableSection
        }));
    };
    toggleTablePopup = () => {
        this.setState(prevState => ({
            showTable: !prevState.showTable
        }));
    };

    clickExecute = async (query) => {
        const Data = {
            database: 'iris',
            query: query
        };

        let result = await Requests.create(`execute`, Data);
        if (result.ok) {
            let data_result = result.data;
            const columns = data_result.columns;
            const results = data_result.results;
            this.setState({columns: columns, queryResults: results})
            if (!this.state.showTableSection)
                this.toggleTableSection();
        } else {
            NotificationManager.error(result.data, "", 4000);
        }

    };

    expandButtonClicked = () => {
        this.toggleTablePopup()
    }

    render() {
        return (
            <div>
                <div className="main">
                    <div className="elementsCol">
                        <DatabaseInformation/>
                    </div>
                    <div className="elementsCol">
                        <WriteQuery clickGenerate={this.clickGenerate} clickExecute={this.clickExecute}/>
                        <Result result={this.state.newQuery}/>
                    </div>
                    <div className="elementsCol">
                        {this.state.results.length ?
                            <div>
                                <ListResult results={this.state.results}
                                            reconstructCondition={this.constructDisjunctionCondition}/>
                            </div>
                            : null
                        }
                        {this.state.showTableSection ?
                            <div className="listDiv">
                                <Container>
                                    <div id="openTable"><Header as="h2">Open Table</Header>
                                        <Button className="color1" onClick={this.expandButtonClicked} circular icon='external alternate'/>
                                    </div>
                                    <div className="numberTuples"> Number of resulted
                                        tuples: {this.state.queryResults.length}</div>
                                </Container>
                                <Divider/>
                            </div>
                            : null
                        }

                    </div>

                </div>
                {this.state.showTable ?
                    <Table columns={this.state.columns} results={this.state.queryResults}
                           closePopup={this.toggleTablePopup}/>
                    : null
                }
            </div>
        );
    }

}

export default MainPage
