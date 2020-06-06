import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Divider, Header} from "semantic-ui-react";


function PieChart(props){

    const chartData= {
        labels : ['New Data', 'Old Data'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#00A6B4',
                    '#6800B4'
                ],
                hoverBackgroundColor: [
                    '#003350',
                    '#35014F'
                ],
                data: props.data
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
