import React from 'react';
import "../css/list.css"
import {Checkbox, Container, Divider, Header, List} from 'semantic-ui-react'

class ListResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            areChecked: {},
            elements: []
        }
    }

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
        this.setState({
            areChecked: {
                ...this.state.areChecked,
                [id]: isChecked
            },
        }, this.filterChecked);

    }
    getRowCondition = () => {
        return this.props.results.map(({checked, value}, index) => {
            return (
                <List.Item key={index}>
                    <List.Content>
                        <Checkbox className="listFont" label={value} id={index} defaultChecked={checked}
                                  onChange={this.checkCheckBox}/>
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
