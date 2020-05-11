import React, {Component} from 'react';
import axios from 'axios';
import "../css/main.css"
import WriteQuery from "./WriteQuery";
import Result from "./Result";
import List from "./List";


class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newQuery: "",
            results: [],
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

    render() {
        return(
            <div className="main">
                <div className="elementsCol">
                    <div>Data here</div>
                    <div>Statistica aici</div>
                </div>
                <div className="elementsCol">
                    <WriteQuery clickGenerate={this.clickGenerate}/>
                    <Result result={ this.state.newQuery}/>
                </div>
                <List results={this.state.results}/>
            </div>

        );
    }

}

export default MainPage
