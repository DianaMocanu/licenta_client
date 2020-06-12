import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Divider, Header} from "semantic-ui-react";


function PieChart(props){

    const chartData= {
        labels : ['Old Tuples in new Query', 'Old tuples not in new Query', "Completely New tuples"],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#00A6B4',
                    '#BB4430',
                    '#6800B4',
                ],
                hoverBackgroundColor: [
                    '#003350',
                    '#a0311f',
                    '#35014F',
                ],
                data: props.data || null
            }
        ]
    }

    return(
        <div>
            <Header as='h2'>Generated query distribution</Header>
            <Pie data={chartData}
             options={{
                 legend:{
                     display:true,
                     position:'right'
                 }
             }}
        />
            <Divider/>
        </div>
    );
}

export default PieChart
