import * as Slider from "@radix-ui/react-slider"

import { colors, invertedColors } from "@/lib/constants";

export default function FeedbackSlider(
    {
    inverted,
    title,
    lowBoundText, 
    highBoundText,
    dynamicValue,
    valueChangeCallback,
    className = ""
    }:{
        inverted:boolean;
        title:string;
        lowBoundText:string;
        highBoundText:string;
        dynamicValue:number;
        valueChangeCallback:any;
        className?:string;
    }
)
{
    return (
        <div className={className}>
            <h2 className="font-bold text-2xl text-black">{title}</h2>
            <div className="flex flex-col justify-center items-center">
                <Slider.Root 
                    defaultValue={[dynamicValue]} 
                    max={10} 
                    step={1} 
                    className="w-3/4 h-10 relative flex items-center select-none touch-none" 
                    onValueChange={(newValue:number[]) => {valueChangeCallback(newValue[0])}}
                >

                    <Slider.Track className="relative h-1 bg-rblue-500 flex-grow">
                      <Slider.SliderRange className="absolute "/>
                    </Slider.Track>
                    <Slider.Thumb className="bg-white w-8 h-8 block rounded-full focus:shadow-2xl border-blue-500 border-2 items-center justify-center cursor-pointer">
                      <p className={`${(dynamicValue === 10 ) ? "ml-[5px]" : "ml-[9px]"} mt-8 ${ (inverted) ? invertedColors[dynamicValue]: colors[dynamicValue]} font-bold`}>{dynamicValue}</p>
                    </Slider.Thumb>
                </Slider.Root>

                <div className="w-3/4 mt-5 relative">
                    <p className="absolute left-0 font-bold">{lowBoundText}</p>
                    <p className="absolute right-0 font-bold">{highBoundText}</p>
                </div>

            </div>
        </div>   
    )
}