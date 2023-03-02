import Layout from "@/components/layout"
import { motion } from "framer-motion";

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";

import { useRouter } from "next/router";

import { ArrowLeft, ArrowDown, ArrowUp, Check, ChevronDown } from "lucide-react";

import { useState } from "react";
import { DateTime } from "luxon";

import * as Select from "@radix-ui/react-select"

export default function CreateSession()
{
    const router = useRouter();
    const API_URL = process.env.MEJT_API_URL;

    const [sessionInfo, setSessionInfo] = useState(
        {
            sessionName : "",
            sessionDate : DateTime.now().toJSDate(),
            sessionLocation : "",
            sessionDescription : ""
        }
    )

    const handleChangeName = (event:any) =>
    {
        setSessionInfo({
            ...sessionInfo,
            sessionName:event.target.value
        })
    };

    const handleChangeLocation = (event:any) =>
    {
        setSessionInfo({
            ...sessionInfo,
            sessionLocation:event.target.value
        })
    };

    const handleChangeDescription = (event:any) =>
    {
        setSessionInfo({
            ...sessionInfo,
            sessionDescription:event.target.value
        })
    };

    const onClickCreateSession = () =>
    {
        console.log(sessionInfo);
    }
    
    const teams:string[] = ["Equipe 1", "Joueur 1", "Equipe 2", "Equipe 3", "Joueur 2", "Equipe 4", "Joueur 3", "Equipe 5", "Equipe 6", "Joueur 4"];

    return (
        
        <Layout>
            <div className="flex w-full flex-row items-center">
                <motion.div
                    className="w-full max-w-full md:px-80"
                    initial="hidden"
                    whileInView="show"
                    animate="show"
                    viewport={{ once: true }}
                        variants={{
                        hidden: {},
                        show: {
                            transition: {
                            staggerChildren: 0.15,
                        },
                        },
                    }}
                >
                    <motion.div
                        className="pt-32"
                        variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <section className="flex">
                            <ArrowLeft/>
                            <p className="text-lg font-bold">
                                <a href="localhost:3000/trainer/dashboard">Go back</a>
                            </p>
                        </section>
                    </motion.div>

                    <motion.div
                        variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <h1 className="text-4xl font-bold text-rblue-500 text-center mt-5">Create your next session !</h1>
                    </motion.div >

                    <motion.div 
                    className="mt-10"
                    variants={FADE_DOWN_ANIMATION_VARIANTS}>

                        <Select.Root>
                            <Select.Trigger className="border-blue-300 border-2 bg-rblue-500 w-80 px-4 py-2 relative text-xl flex text-white justify-center content-center">
                                <Select.Value placeholder="Select a team..."/>
                                <Select.Icon className="absolute right-4"><ChevronDown color ="white" size={30}/></Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="h-96" position="popper">
                                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-blue-300">
                                        <ArrowUp color="white"/>
                                    </Select.ScrollUpButton>
                                    <Select.Viewport>
                                        <Select.Group>
                                            {
                                                teams.map((team) => {
                                                    return (
                                                    <Select.Item key={team} className="relative text-xl border-blue-300 border-2 bg-rblue-500 w-80 px-4 py-2 flex text-white" value={team}>
                                                        <Select.ItemText>{team}</Select.ItemText>
                                                        <Select.ItemIndicator className="absolute right-4"><Check/></Select.ItemIndicator>
                                                    </Select.Item>);
                                                })
                                            }
                                        </Select.Group>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-blue-300">
                                        <ArrowDown color="white"/>
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        
                        <motion.div
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mt-10 flex flex-row">
                            <h1 className="text-3xl text-gray-500 font-bold">Session name : </h1>
                            <input type="text" className="ml-5 text-xl rounded-lg" value={sessionInfo.sessionName} onChange={handleChangeName}/>
                        </motion.div>
                
                        <motion.div
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mt-10 flex flex-row">
                            <h1 className="text-3xl text-gray-500 font-bold">When does it take place ?</h1>

                        </motion.div>

                        <motion.div
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mt-10 flex flex-row">
                            <h1 className="text-3xl text-gray-500 font-bold">Session place : </h1>
                            <input type="text" className="ml-6 text-xl rounded-lg" value={sessionInfo.sessionLocation} onChange={handleChangeLocation}/>
                        </motion.div>
                        
                        <h1 className="mt-10 text-3xl text-gray-500 font-bold">Give some details !</h1>
                    </motion.div>

                    <motion.div
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                        className="flex justify-center mt-5">
                        <textarea cols={100} rows={10} className="rounded-lg" value={sessionInfo.sessionDescription} onChange={handleChangeDescription}></textarea>
                    </motion.div>

                    <motion.div
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                        className="flex w-auto justify-center mt-10">
                        <button className="bg-rblue-500 text-bold text-white text-xl py-2 px-10 rounded-md" onClick={onClickCreateSession}>Create session</button>
                    </motion.div>
                </motion.div>
            </div>
           
        </Layout>
    );
}