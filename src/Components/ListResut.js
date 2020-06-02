import React from 'react';
import "../css/list.css"
import {Checkbox, Container, Divider, Header, List} from 'semantic-ui-react'

class ListResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            areChecked: {},
            elements: [],
        }
    }

    // componentDidMount() {
    //     let newObj =[];
    //     // let newChecked = {};
    //     this.props.results.forEach(({checked, value}, index)=>{
    //         newObj[index]= {
    //             checked:  checked,
    //             value: value,
    //         }
    //     });
    //     this.setState({
    //         elements : newObj
    //     })
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.results !== this.props.results){
    //         let newObj =[];
    //         this.props.results.forEach(({checked, value}, index)=>{
    //             newObj[index]= {
    //                 checked:  checked,
    //                 value: value,
    //             }
    //         });
    //         this.setState({
    //             elements : newObj
    //         })
    //     }
    // }

    filterChecked = () => {
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});
        let checkboxes = this.state.areChecked;
        const filtered = Object.filter(checkboxes, score => score === true);
        this.props.reconstructCondition(Object.keys(filtered))
    }

    checkCheckBox = (event, ch) => {
        const isChecked = ch.checked
        const id = event.target.id;
        // let newState = Object.assign({}, this.state);
        // console.log(isChecked, id, newState)
        // newState.elements[id].checked = isChecked;
        // newState.areChecked[id] = isChecked;
        // this.setState(newState,this.filterChecked);
        this.setState({
            areChecked: {
                ...this.state.areChecked,
                [id]: isChecked
            },
        }, this.filterChecked);


    }

    modifyChecked = (id, value) => {
        this.setState({
            areChecked: {
                ...this.state.areChecked,
                [id]: value
            }
        });
    }

    // getRowCondition = () =>{
    //   return this.props.results.map((row, index)=>{
    //
    //           let checked = index === 0;
    //      return(
    //          <li className="conditionLiClass" key={index}>
    //              <FormControlLabel control={<Checkbox id={index.toString()} onChange={this.checkCheckBox} value={row}/>} label={row.toString()}/>
    //          </li>
    //      );
    //   });
    // };
    getRowCondition = () => {
        return this.props.results.map(({checked, value}, index) => {
            return (
                <List.Item key={index}>
                    {/*<FormControlLabel control={<Checkbox id={index.toString()} onChange={this.checkCheckBox} value={row}/>} label={row.toString()}/>*/}
                    <List.Content>
                        <Checkbox className="listFont" label={value} id={index} defaultChecked={checked}
                                  onChange={this.checkCheckBox}/>
                        {/*<List.Header> {row.toString()}</List.Header>*/}
                    </List.Content>
                </List.Item>
            );
        });
    };

    render() {
        return (
            <div className="listDiv">
                <Container>
                    <Header as="h2">Choose Query Condition</Header>
                    <List divided relaxed size='big'>
                        {this.getRowCondition()}
                    </List>
                    <Divider/>
                </Container>
            </div>
        );
    }


}

export default ListResult
