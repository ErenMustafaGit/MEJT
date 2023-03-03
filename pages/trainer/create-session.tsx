import Layout from "@/components/layout"
import { motion } from "framer-motion";

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";

import { useRouter } from "next/router";

import { ArrowLeft, ChevronDown, CheckIcon, Globe, Users, ClipboardType, ClipboardList, CalendarClock, MapPin} from "lucide-react";

import { useState, useEffect, Fragment } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { DateTime } from "luxon";

import { Listbox, Transition } from "@headlessui/react";

import Axios from "axios";

export default function CreateSession()
{
    const router = useRouter();
    const API_URL = process.env.MEJT_API_URL;
    /*
    const [teams, setTeams] = useState<{name:string;id:number}[]>([]);
    setTeams([
        {
            name:"Equipe 1",
            id:1
        },
        {
            name:"Equipe 2",
            id:2
        },
        {
            name:"Joueur 1",
            id:3
        },
        {
            name:"Equipe 3",
            id:4
        },
        {
            name:"Equipe 4",
            id:5
        },
        {
            name:"Joueur 2",
            id:6
        },

    ])
    */

    const teams = [
        {
            name:"Equipe 1",
            id:1
        },
        {
            name:"Equipe 2",
            id:2
        },
        {
            name:"Joueur 1",
            id:3
        },
        {
            name:"Equipe 3",
            id:4
        },
        {
            name:"Equipe 4",
            id:5
        },
        {
            name:"Joueur 2",
            id:6
        },

    ];

    /*
    const getAllTeams = async () =>
    {
        await Axios.get(`${API_URL}/trainer/teams`)
        .then((response) => {
            const allTeams = response.data.teams;            
            setTeams(allTeams.map((team:any) => {
                return {
                    name:team.name,
                    id:team.teamId
                }
            }));
        })
    }
    */

    const [sessionInfo, setSessionInfo] = useState(
        {
            sessionTeamId : -1,
            sessionName : "",
            sessionDate : DateTime.now().toJSDate(),
            sessionLocation : "",
            sessionDescription : ""
        }
    )

    const submitNewSession = async (e:any) => {
        /*

        e.preventDefault();
        let token: string;
        try
        {
            const {data} = await Axios.post(`${API_URL}/trainer/sessions/create`,{
                teamId:sessionInfo.sessionTeamId,
                date:sessionInfo.sessionDate.toISOString(),
                place:sessionInfo.sessionLocation,
                description:sessionInfo.sessionDescription,
                name:sessionInfo.sessionName
            });

            token = data.userDetails;
        }catch (error){
            if (Axios.isAxiosError(error)) {
                console.error(error);
            } else {
            console.error(error);
            }
        }
        */
        e.preventDefault();
        console.log(sessionInfo);
    }
    
    const [selectedTeam, setSelectedTeam] = useState(
        {
            name:"Select your team...",
            id:-1
        }
    );

    const [team, setTeam] = useLocalStorage("team", -1);
    
    useEffect(() => {
        setSelectedTeam({
            name:"Select your team...",
            id:-1
        })
    }, [team])

    return (
        
        <Layout>
            <div className="flex w-full flex-row items-center">
                <motion.div
                    className="w-full max-w-full px-6 lg:px-36"
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
                        
                        <form onSubmit={submitNewSession}>
                            <div className="-mx-3 flex">
                                <div className="mb-5 w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <label className="text-3xl text-gray-500 font-bold">Team</label>
                                    <Listbox value={selectedTeam} onChange={ (newTeam) => {
                                            setSelectedTeam(newTeam)
                                            setSessionInfo({...sessionInfo, sessionTeamId:newTeam.id})
                                        }}
                                    >
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg border-2 border-gray-200 bg-white py-2 pl-3 pr-10 text-left outline-none focus:border-rblue-500 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <div className="flex items-center">
                                                <div className="pointer-events-none z-10 flex w-10 items-center justify-center text-center">
                                                    <Users className="-ml-6 w-1/2 text-lg text-gray-400"></Users>
                                                </div>
                                                <span className="-ml-3 block truncate">
                                                    {selectedTeam.name}
                                                </span>
                                            </div>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronDown
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            </Listbox.Button>
                                    
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options 
                                                    className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                    >
                                                    {teams.map((team, teamId) => {
                                                    return (
                                                        <Listbox.Option
                                                            key={teamId}
                                                            value={team}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active
                                                                ? "bg-rblue-100 text-rblue-900"
                                                                : "text-gray-900"
                                                            }`}
                                                        >
                                                        
                                                        {({ selected }) => (
                                                            <>
                                                                <span 
                                                                    className={`block truncate ${
                                                                    selected ? "font-medium" : "font-normal"
                                                                    }`}
                                                                >
                                                                    {team.name}
                                                                </span>

                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rblue-600">
                                                                        <CheckIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                        </Listbox.Option>)
                                                    })}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col">
                                <label className="text-3xl text-gray-500 font-bold">Session name</label>
                                <div className="flex">
                                <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                                    <ClipboardType className="w-1/2 text-lg text-gray-400"/>
                                </div>
                                    <input type="text" className="mt-1 md:mt-0 rounded-lg w-full lg:w-1/2 xl:w-2/5 -ml-10 border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500" value={sessionInfo.sessionName} onChange={(e) => setSessionInfo({...sessionInfo, sessionName:e.target.value})}/>
                                </div>
                            </div>


                            <div className="mt-10">
                                <label className="text-3xl text-gray-500 font-bold">When does it take place ?</label>
                            </div>

                            <div className="mt-10 flex flex-col">

                                <label className="text-3xl text-gray-500 font-bold">Session place</label>
                                <div className="flex">
                                <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                                    <MapPin className="w-1/2 text-lg text-gray-400"/>
                                </div>
                                    <input type="text" className="mt-1 md:mt-0 rounded-lg w-full lg:w-1/2 xl:w-2/5 -ml-10 border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500" value={sessionInfo.sessionLocation} onChange={(e) => setSessionInfo({...sessionInfo, sessionLocation:e.target.value})}/>
                                </div>                            
                            </div>
                         
                            <div className="flex flex-col w-auto justify-center mt-10">
                                <label className="text-3xl text-gray-500 font-bold">Give some details !</label>
                                <textarea cols={100} rows={10} className="mt-0 md:mt-1 rounded-lg" value={sessionInfo.sessionDescription} onChange={(e) => setSessionInfo({...sessionInfo, sessionDescription:e.target.value})}></textarea>
                            </div>

                            <div
                              className="flex w-auto justify-center mt-10"
                            >
                                <button className="bg-rblue-500 text-bold text-white text-xl py-2 px-10 rounded-md">Create session</button>
                            </div>
                            
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}