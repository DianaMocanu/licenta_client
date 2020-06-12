import {Bar, HorizontalBar} from "react-chartjs-2";
import React from "react";

const maxAndMin = (array)=>{
   const min =  Math.min.apply(null, array) // 1
   const max = Math.max.apply(null, array)
    return [min, max]
}

function BarChart(props){

    let maxValue =0.0;
    const constructData = () =>{
        let finalData = [];
        let max = 0;
        let maxArray, minArray;
        const len = props.data[0].length-1;
        (maxArray = []).length = len;
        (minArray = []).length = len;
        maxArray.fill(0);
        minArray.fill(Infinity);
        props.data.forEach((col)=> {
            col.forEach((element, index)=>{
                if(index < props.data.length-1) {
                    if (element > maxArray[index])
                        maxArray[index] = element;
                    if (element < minArray[index])
                        minArray[index] = element;
                }
            });
        }

        );
        maxArray.forEach((col, index)=>{
            finalData.push([minArray[index], col]);
        })
        return finalData;
    }
    const chartData= {
        labels : props.columns,
        datasets: [
            {
                label: 'Rainfall',
                // barPercentage: 0.5,
                // barThickness: 6,
                // maxBarThickness: 8,
                // minBarLength: 2,
                backgroundColor: ['#773344',
                    '#7EBDC2',
                    '#BB4430',
                    '#F3DFA2',
                    '#087E8B',
                    '#C884A6',
                    '#14BDEB',
                    '#A663CC'
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
                             // beginAtZero: true,
                             steps: 0,
                             stepSize: 200,
                             autoSkip: false,
                             // max: maxValue,//max value for the chart is 60
                         }
                         // gridLines: {
                         //     offsetGridLines: true
                         // }
                         //     ticks: {
                     //         min:-10,
                     //         max: 600,
                     //     }
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
