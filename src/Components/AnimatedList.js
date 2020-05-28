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
    return(
        <List animated verticalAlign='middle'>
            {
                mapColumns()
            }
        </List>
    )
}

export default AnimatedList
