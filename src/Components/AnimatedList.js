import React from 'react'
import { List } from 'semantic-ui-react'

function AnimatedList(props) {

    const mapColumns = () =>{
        return props.columns.map((column, index)=> {
            return(
                <List.Item key={index}>
                    <List.Content>
                         <List.Header>{column}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });
    }
    // animated verticalAlign='middle'
    return(
        <List divided verticalAlign='middle' animated>
            {
                mapColumns()
            }
        </List>
    )
}

export default AnimatedList
