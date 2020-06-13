import {HorizontalBar} from "react-chartjs-2";
import React, {useState} from "react";

const maxAndMin = (array)=>{
   const min =  Math.min.apply(null, array) // 1
   const max = Math.max.apply(null, array)
    return [min, max]
}

const calculateSteps = (maxArray, minArray, steps) =>{
    const max = Math.max.apply(null, maxArray);
    const min = Math.min.apply(null, minArray);
    const range = max-min;
    const step = range/steps;
    const mag10= Math.ceil(Math.log(step)/Math.log(10));
    return Math.pow(10, mag10);
}
function BarChart(props){

    // const [step, setStep] = useState(0);
    const constructData = () =>{
        let finalData = [];
        let maxArray, minArray;
        if(props.data.length) {
            const len = props.data[0].length - 1;
            (maxArray = []).length = len;
            (minArray = []).length = len;
            maxArray.fill(0);
            minArray.fill(Infinity);
            if (props.data) {
                props.data.forEach((col) => {
                        col.forEach((element, index) => {
                            if (index < props.data.length - 1) {
                                if (element > maxArray[index])
                                    maxArray[index] = element;
                                if (element < minArray[index])
                                    minArray[index] = element;
                            }
                        });
                    }
                );
            }
            maxArray.forEach((col, index) => {
                finalData.push([minArray[index], col]);
            })
        }
        return finalData;
    }
    const chartData= {
        labels : props.columns,
        datasets: [
            {
                backgroundColor: [
                    '#773344',
                    '#7EBDC2',
                    '#BB4430',
                    '#F3DFA2',
                    '#087E8B',
                    '#C884A6',
                    '#14BDEB',
                    '#A663CC',
                    '#a77d93',
                    '#73d5ef',
                    '#cb9ae7',
                    '#3d151f',
                    '#1f4649',
                    '#fd5031',
                    '#f3cd58',
                    '#1eb2c2'
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                fullWidth: true,
                data: constructData(),
            }
        ]
    }

    return (<div>
        <HorizontalBar
            data={chartData}

             options={{
                 scaleOverride:true,
                 scaleSteps:9,
                 scaleStartValue:0,
                 scaleStepWidth:100,
                 scales: {
                     xAxes:[{
                         ticks: {
                             steps: 2,
                             // stepSize: 250,
                             // autoSkip: false,
                         }
                     }],
                     yAxes:[{
                         ticks: {
                             // steps: 5,
                             // stepSize: 250,
                             autoSkip: false,
                         }
                     }],
                 },
                 legend:{
                     display:false,
                 }
             }}
        />
    </div>);
}

export default BarChart
