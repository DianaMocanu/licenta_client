import React, {Component} from 'react';
import axios from 'axios';
import "../css/main.css"
import WriteQuery from "./WriteQuery";
import Result from "./Result";
import List from "./List";
import Table from "./Table";


class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newQuery: "",
            results: [],
            columns: [],
            queryResults: [],
            showTable: !false,
        };
    }

    constructNewQuery = (query, condition)=>{
        let whereIndex = query.toLowerCase().indexOf("where");
        let first_part = query.slice(0, whereIndex);
        return first_part + " " + condition
    };

    clickGenerate = async (query) => {
        const Data ={
            database: 'iris',
            query: query
        };
        const config = { headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
        };
        let result = await axios.post(`http://127.0.0.1:5000/query`, {Data}, config)
        if(result.status === 200){
            let data_result = result.data;
            let newQuery = this.constructNewQuery(query, data_result[0])
            this.setState({newQuery: newQuery, results: data_result});



        }

    };
    togglePopup = () => {
        this.setState(prevState => ({
            showTable: !prevState.showTable
        }));
    };
    clickExecute = async (query) => {
        const Data ={
            database: 'iris',
            query: query
        };
        const config = { headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
        };

        let result = await axios.post(`http://127.0.0.1:5000/execute`, {Data}, config)
        if(result.status === 200){
            let data_result = result.data;
            const columns = data_result.columns
            const results = data_result.results
            this.setState({columns: columns, queryResults: results})
            // this.togglePopup()
        }

    };

    render() {
        return(
            <div className="main">
                <div className="elementsCol">
                    <div>Data here</div>
                    <div>Statistica aici</div>
                </div>
                <div className="elementsCol">
                    <WriteQuery clickGenerate={this.clickGenerate} clickExecute={this.clickExecute}/>
                    <Result result={ this.state.newQuery}/>
                </div>
                <List results={this.state.results}/>
                {this.state.showTable ? (
                    <Table columns={this.state.columns} results={this.state.queryResults} closePopup={this.togglePopup}/>)
                    :null
                }
            </div>

        );
    }

}

export default MainPage