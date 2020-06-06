import React from 'react';
import { Dropdown } from 'semantic-ui-react'

    function DropdownClearable (props) {

        const elementSelected = (event, data) => {
            const value = event.target.textContent;
            const key = data.value;
            props.onSelected(value, key)
        };

        return(
        <Dropdown clearable options={props.options} onChange={elementSelected} selection/>
        );

    }
    export default DropdownClearable
