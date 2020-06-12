import React from 'react';
import "../css/WriteQuery.css"
import {Header} from "semantic-ui-react";

class WriteQuery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'select * from iris_data where petal_length < 4.2 and petal_width > 1.2'
        };

    }

    handleChange = (event) =>{
        // const regex = RegExp('^(?=.*SELECT.*FROM)(?!.*(?:CREATE|DROP|UPDATE|INSERT|ALTER|DELETE|ATTACH|DETACH)).*$\n');
        let query = event.target.value;
        this.setState({value: query});
    };
    handleClick =() => {
        let query = this.state.value;
        this.props.clickGenerate(query)
    };
    handleExecClick =() => {
        let query = this.state.value;
        this.props.clickExecute(query)
    };

    render() {
        return (
            <div className="writeQueryDiv" >
                <textarea className="inputQuery" value={this.state.value} onChange={this.handleChange}/>
                <div>
                    <button className="ui color1 medium button" onClick={this.handleClick}>Generate</button>
                    <button className="ui color1 medium button" onClick={this.handleExecClick}>Execute</button>
                {/*<button className="appButtons" onClick={this.handleClick}>Generate</button>*/}
                {/*<button className="appButtons" onClick={this.handleExecClick}>Run Query</button>*/}
                </div>
            </div>
        );
    }
}

export default WriteQuery
