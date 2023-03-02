import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Filler, TimeScale } from 'chart.js';

import Balancer from "react-wrap-balancer";

import 'chartjs-adapter-luxon';
import { filterData } from '@/lib/utils';

Chart.register(Filler, TimeScale)

//TODO  : passer en flex col quand on réduit la taille

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
    const allXValues:number[] = xValues;
    const allYValues:number[] = yValues;
    const [activeTab, setActiveTab]= useState([true, false, false, false]);
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
    
    const defaultData = () => {
        setChartData({
            labels: allXValues,
            datasets:[
            {
                data:allYValues,
                borderColor:lineColor,
                fill:{
                    target:'origin',
                    above:fillColor,
                }
            }
            ],
            position:"right"
        })
        setActiveTab([true, false, false, false]);
    }

    const oneYearData = () => {
        setChartData(filterData(chartData, allXValues, allYValues, 0, 1));
        setActiveTab([false, true, false, false]);
    }

    const threeMonthsData = () => {
        setChartData(filterData(chartData, allXValues, allYValues, 3));
        setActiveTab([false, false, true, false]);
    }

    const oneMonthData = () => {
        setChartData(filterData(chartData, allXValues, allYValues, 1));
        setActiveTab([false, false, false, true]);
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
            <div className='flex xl:flex-row flex-col mr-2'>
               <h3 className='mb-1 text-xl font-bold mx-1 w-1/5'>{title}</h3>

                <div className='flex-row w-4/5 justify-center'>

                    <button className='
                    w-1/4 rounded-tl-lg rounded-bl-lg border-r-[1px] border-white
                     bg-rblue-500 
                     p-1.5 px-4 
                     text-sm text-white transition-all
                     hover:border-rblue-600 hover:border-r-4' 
                     style={
                        {
                            backgroundColor: activeTab[0] ? 'rgb(10 76 140 / 1)' : 'rgb(7 103 191 / 1)',    
                        }
                        
                    }
                     onClick={defaultData}>
                        <Balancer>
                        No Filter
                        </Balancer>
                    </button>

                    <button className=' w-1/4 border-x-[1px]  border-white bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:border-x-4' onClick={oneYearData}
                                         style={{backgroundColor: activeTab[1] ? 'rgb(10 76 140 / 1)' : 'rgb(7 103 191 / 1)' }}
                                         >
                    <Balancer>
                        1 year
                        </Balancer>
                    </button>

                    <button className='w-1/4 border-x-[1px]  border-white bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:border-x-4' onClick={threeMonthsData}
                                         style={{backgroundColor: activeTab[2] ? 'rgb(10 76 140 / 1)' : 'rgb(7 103 191 / 1)' }}
                                         >
                    <Balancer>
                        3 months

                        </Balancer>
                    </button>

                    <button className='w-1/4 rounded-tr-lg rounded-br-lg border-l-[1px] border-white bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:border-x-4' onClick={oneMonthData}
                                         style={{backgroundColor: activeTab[3] ? 'rgb(10 76 140 / 1)' : 'rgb(7 103 191 / 1)' }}
                                         >
                    <Balancer>
                        1 month

                        </Balancer>
                    </button>

                </div>
            </div>

            <Line
                data={chartData} 
                options={optionsData}
            />
            
        </div>
        </>
    );
}