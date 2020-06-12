import React from 'react';
import "../css/WriteQuery.css"

class WriteQuery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

    }
    handleChange = (event) =>{
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
                <textarea  className="inputQuery" placeholder='enter a query' value={this.state.value} onChange={this.handleChange}/>
                <div>
                    <button className="ui color1 medium button" onClick={this.handleClick}>Generate</button>
                    <button className="ui color1 medium button" onClick={this.handleExecClick}>Execute</button>
                </div>
            </div>
        );
    }
}

export default WriteQuery
