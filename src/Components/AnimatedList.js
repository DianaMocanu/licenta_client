import React, {useState} from 'react'
import {Icon, List, Popup} from 'semantic-ui-react'
import Requests from "./Requests";

function AnimatedList(props) {

    const [maxMin, setMaxMin] = useState("");
    let handle = (event) =>{
        event.stopPropagation();
        // event.preventDefault();
        if( event.target.className === 'header listColumnItem' ) {
            event.stopPropagation();
            props.columnSelected(event.target.textContent)
        }
    }
    const iconClicked = async (column, ev) =>{
        const Data = {
            database: props.database,
            table : props.table,
            column: column,
        }
        const response = await Requests.create('maxMin', Data);
        if(response.ok){
            setMaxMin(`Interval:  [${response.data[0]} - ${response.data[1]}] `);
        }

    }

    // document.addEventListener( "dblclick", handle, false);

    const mapColumns = () =>{
        return props.columns.map((column, index)=> {
            return(
                <List.Item key={index} >
                    <Popup
                        trigger={<List.Icon link={true} name='info' verticalAlign='middle' size='large' onClick={iconClicked.bind(this, column, index)}/>}
                        on='click'
                        hideOnScroll
                        content={maxMin}
                        mouseEnterDelay={600}
                    />
                    {/*<List.Icon link={true} name='info' verticalAlign='middle' size='large' onClick={iconClicked.bind(this, column, index)}/>*/}
                    <List.Content>
                         <List.Header onDoubleClick={handle} className='listColumnItem'>{column}</List.Header>
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
