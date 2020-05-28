import React from 'react';
import { Dropdown } from 'semantic-ui-react'

    function DropdownClearable (props) {

        const elementSelected = (event) => {
            const value = event.target.textContent;
            props.onSelected(value)
        };

        return(
        <Dropdown clearable options={props.options} onChange={elementSelected} selection/>
        );

    }
    export default DropdownClearable
