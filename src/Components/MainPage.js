import React, {Component} from 'react';
import "../css/main.css"
import WriteQuery from "./WriteQuery";
import Result from "./Result";
import ListResult from "./ListResut";
import TablePopup from "./TablePopup";
import DatabaseInformation from "./DatabaseInformation";
import {NotificationManager} from "react-notifications";
import Requests from "./Requests";
import {Button, Container, Divider, Header, Loader} from "semantic-ui-react";
import PieChart from "./Charts";
import BarChart from "./DistributionChart";


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
            database: "",
            negationKey: 1,
            loader: false,
            showChart: false,
            chartData: [],
            chartIsChecked: false,
            randomRate: 15,
            posIds: [],

        };
    }

    negationIsSelected = negationKey =>{
        if(negationKey === 0)
            this.setState({negationKey: 1})
        else
            this.setState({negationKey: negationKey})
    }

    getQueryFirstPart = query => {
        let whereIndex = query.toLowerCase().indexOf("where");
        return query.slice(0, whereIndex + 5)
    }

    chartCheckboxChange = checked =>{
        this.setState({chartIsChecked: checked})
    }
    constructDisjunctionCondition = async resultIds => {
        if (resultIds.length === 0) {
            let whereIndex = this.state.initialQuery.toLowerCase().indexOf("where");
            const newQuery = this.getQueryFirstPart(this.state.initialQuery).slice(0, whereIndex);
            this.setState({newQuery: newQuery}, this.updateChartExec);
            return;
        }

        let newCond = "";
        resultIds.forEach((id) => {
            let idInt = parseInt(id);
            newCond += "( " + this.state.results[idInt].value + ") or ";
        });

        const finalCond = newCond.slice(0, newCond.length - 3);
        const newQuery = this.getQueryFirstPart(this.state.initialQuery) + " " + finalCond;
        this.setState({newQuery: newQuery}, this.updateChartExec);
    };

    constructNewQuery = (query, condition) => {

        const first_part = this.getQueryFirstPart(query);
        return first_part + " " + condition
    };

    clickGenerate = async (query) => {
        this.toggleLoaderSection();

        const Data = {
            database: this.state.database,
            query: query,
            negation: this.state.negationKey,
            rate: this.state.randomRate,
        };
        this.setState({initialQuery: query});
        let result = await Requests.create('generate', Data)
        if (result.ok) {
            this.toggleLoaderSection();
            let data_result = result.data.results;
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

            if(this.state.chartIsChecked) {
                    this.setState({posIds: result.data.pos_ids})
               await this.updateChartExec()
            }
            this.toggleChartSection(this.state.chartIsChecked)
        } else {
            this.toggleLoaderSection();
            NotificationManager.error(result.data, "", 4000);
        }

    };

    checkNegPosEx = (tuples) => {
        let oldInNew = 0;
        tuples.forEach(idTuple =>{
            this.state.posIds.forEach(posId => {
                if(idTuple === posId) oldInNew++;
            });
        });
        const notOldInNew = this.state.posIds.length - oldInNew;
        const completeNew = tuples.length - oldInNew;
        return [oldInNew, notOldInNew, completeNew]
    }

    updateChartExec = async () =>{
        if(this.state.chartIsChecked) {
            const Data = {
                database: this.state.database,
                query: this.state.newQuery
            };
            let newResult = await Requests.create(`executeId`, Data);
            if (newResult.ok) {
                const calculations = this.checkNegPosEx(newResult.data.results)
                console.log(calculations)
                this.setState({chartData: calculations})
            }
        }
    }
    toggleLoaderSection = () => {
        this.setState(prevState => ({
            loader: !prevState.loader
        }));
    };

    toggleChartSection = (value) => {
        this.setState(prevState => ({
            showChart: value
        }));
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
            database: this.state.database,
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

    databaseIsChanged = (database) => {
        this.setState({database: database});
    }
    expandButtonClicked = () => {
        this.toggleTablePopup()
    }
    isColumnSelected = (column) =>{
        console.log(column)
    }

    rateIsSelected = (rate) =>{
        this.setState({randomRate: Number(rate)})
}
    render() {
        return (
            <div>
                <div className="main">
                    <div className="elementsCol">
                        <DatabaseInformation rateIsSelected={this.rateIsSelected} isColumnSelected={this.isColumnSelected} chartCheckboxChange={this.chartCheckboxChange} databaseIsChanged={this.databaseIsChanged} negationIsSelected={this.negationIsSelected}/>
                    </div>
                    {this.state.loader ? <Loader active={true}/>: null}
                    <div className="elementsCol">
                        <WriteQuery clickGenerate={this.clickGenerate} clickExecute={this.clickExecute}/>
                        <Result clickExecute = {this.clickExecute} result={this.state.newQuery}/>
                    </div>
                    <div className="elementsCol">
                        {this.state.results.length ?
                            <div>
                                <ListResult results={this.state.results}
                                            reconstructCondition={this.constructDisjunctionCondition}/>
                            </div>
                            : null
                        }
                        {this.state.showChart? <PieChart data={this.state.chartData}/> : null}
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
                        {
                            this.state.showTableSection ?
                                <div className='listDiv'>
                                    <Header as='h2'>Data Distribution</Header>
                                    <BarChart columns = {this.state.columns.slice(0,  -1)} data = {this.state.queryResults}/>
                                    <Divider/>
                                </div>
                                :null
                        }


                    </div>

                </div>
                {this.state.showTable ?
                    <TablePopup columns={this.state.columns} results={this.state.queryResults}
                                closePopup={this.toggleTablePopup}/>
                    : null
                }
            </div>
        );
    }

}

export default MainPage
