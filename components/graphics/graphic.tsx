import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Filler, TimeScale } from 'chart.js';

import {DateTime} from 'luxon';

import 'chartjs-adapter-luxon';

Chart.register(Filler, TimeScale)

// TODO :
// clickable points

export default function Graphic(    
    {
    title,
    xValues,
    yValues,
    lineColor,
    fillColor
    }:{
        title:string,
        xValues:number[],
        yValues:number[],
        lineColor:string,
        fillColor:string,
    }
)
{  
    const [chartData, setChartData] = useState(
        {
            labels: xValues,
            datasets:[
            {
                data:yValues,
                borderColor:lineColor,
                fill:{
                    target:'origin',
                    above:fillColor,
                }
            }
            ],
            position:"right"
        }
    );
    
    
    const oneMonthData = () =>{
        const newDate = DateTime.now().minus({month:1}).toISO();
        console.log(newDate);
    }

    function threeMonthsData(){
        const newDate = DateTime.now().minus({month:3}).toISO();
        console.log(newDate)
    }

    function oneYearData(){
        const newDate = DateTime.now().minus({year:1}).toISO();
        console.log(newDate)
    }

    const optionsData:any = {
        scales:{
            y:
            {
                position: "right",
            },
            x:
            {
                type:'time',
                time:{
                    unit:'day',
                    displayFormats:{
                        day:"dd MMM"
                    }
                }
            }
        },
        plugins:{
            legend:{
                display:false
            }
        }
    };

    return(
        <>
        <div>
            <h3 className='mb-1 text-2xl font-bold mx-4'>{title}</h3>
            <Line
               data={chartData}
               options={optionsData}
            />
            <div className='flex-row w-11/12 justify-center'>

                <button className='w-1/3 rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600' onClick={oneYearData}>
                    1 year
                </button>

                <button className='w-1/3 rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600' onClick={threeMonthsData}>
                    3 months
                </button>

                <button className='w-1/3 rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600' onClick={oneMonthData}>
                    1 month
                </button>

            </div>
        </div>
        </>
    );
}