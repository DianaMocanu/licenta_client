import React from 'react';
import "../css/WriteQuery.css"
class WriteQuery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'select sepal_length, sepal_width, petal_length, petal_width from iris_data where petal_length < 4.2 and petal_width > 1.2'
        };

    }

    handleChange = (event) =>{
        const regex = RegExp('^(?=.*SELECT.*FROM)(?!.*(?:CREATE|DROP|UPDATE|INSERT|ALTER|DELETE|ATTACH|DETACH)).*$\n');
        let query = event.target.value;
        this.setState({value: query});
    };
    handleClick =() => {
        let query = this.state.value;
        this.props.clickGenerate(query)
    };
    render() {
        return (
            <div className="writeQueryDiv" >
                <textarea className="inputQuery" value={this.state.value} onChange={this.handleChange}/>
                <button className="appButtons" onClick={this.handleClick}>Generate</button>
            </div>
        );
    }
}

export default WriteQuery
