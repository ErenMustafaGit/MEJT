import Layout from "@/components/layout";
import { motion } from "framer-motion";

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";

import { useRouter } from "next/router";
import GoBack from "@/components/home/go-back";

import {
  ChevronDown,
  CheckIcon,
  Users,
  ClipboardType,
  MapPin,
} from "lucide-react";

import { useState, useEffect, Fragment } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { DateTime } from "luxon";

import { Listbox, Transition } from "@headlessui/react";

import Axios from "axios";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import TimePicker from "react-time-picker/dist/entry.nostyle";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import classNames from "classnames";

export default function CreateSession() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;

  const teams = [
    {
      name: "Equipe 1",
      id: 0,
    },
    {
      name: "Equipe 2",
      id: 1,
    },
    {
      name: "Joueur 1",
      id: 2,
    },
    {
      name: "Equipe 3",
      id: 3,
    },
    {
      name: "Equipe 4",
      id: 4,
    },
    {
      name: "Joueur 2",
      id: 5,
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

  const [sessionInfo, setSessionInfo] = useState({
    sessionTeamId: -1,
    sessionName: "",
    sessionDate: DateTime.now(),
    sessionTime: DateTime.now(),
    sessionLocation: "",
    sessionDescription: "",
  });

  // setSessionInfo({...sessionInfo, sessionTime:DateTime.fromMillis(Date.parse(newTime.toString()))})

  const submitNewSession = async (e: any) => {
    /*

        e.preventDefault();
        let token: string;
        try
        {
            if(sessionInfo.sessionTeamId !== -1 && sessionInfo.sessionLocation !== "" && sessionInfo.sessionDescription !== "" && sessionInfo.sessionName !== "")
            {
                const {data} = await Axios.post(`${API_URL}/trainer/sessions/create`,{
                    teamId:sessionInfo.sessionTeamId,
                    date:sessionInfo.sessionDate.set({hour:sessionInfo.sessionTime.hour, minute:sessionInfo.sessionTime.minute}),
                    place:sessionInfo.sessionLocation,
                    description:sessionInfo.sessionDescription,
                    name:sessionInfo.sessionName
                });
                token = data.userDetails;
            }else{
                // message
            }
            
        }catch (error){
            if (Axios.isAxiosError(error)) {
                console.error(error);
            } else {
            console.error(error);
            }
        }
        */

    // TODO : DELETE WHEN CONNECTION TO BACKEND IS OK
    e.preventDefault();

    const data = {
      teamId: sessionInfo.sessionTeamId,
      date: sessionInfo.sessionDate.set({
        hour: sessionInfo.sessionTime.hour,
        minute: sessionInfo.sessionTime.minute,
      }),
      place: sessionInfo.sessionLocation,
      description: sessionInfo.sessionDescription,
      name: sessionInfo.sessionName,
    };

    console.log(data);
  };

  const [selectedTeam, setSelectedTeam] = useState({
    name: "Select your team...",
    id: -1,
  });

  const [team, setTeam] = useLocalStorage("team", -1);

  useEffect(() => {
    setSelectedTeam({
      name: "Select your team...",
      id: -1,
    });
  }, [team]);

  return (
    <Layout>
      <div className="flex w-full flex-row items-center">
        <motion.div
          className="w-full max-w-full py-20 px-6 md:py-32 lg:px-36"
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
          <GoBack path="/trainer/dashboard"></GoBack>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <h1 className="mt-5 text-center text-4xl font-bold text-rblue-500">
              Create your next session !
            </h1>
          </motion.div>

          <motion.div className="mt-10" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <form onSubmit={submitNewSession}>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3 lg:w-1/2 xl:w-2/5">
                  <label className="text-3xl font-bold text-gray-500">
                    Team
                  </label>
                  <Listbox
                    value={selectedTeam}
                    onChange={(newTeam) => {
                      setSelectedTeam(newTeam);
                      setSessionInfo({
                        ...sessionInfo,
                        sessionTeamId: newTeam.id,
                      });
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
                        <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        team.id === selectedTeam.id
                                          ? "font-medium"
                                          : "font-normal"
                                      }`}
                                    >
                                      {team.name}
                                    </span>

                                    {team?.id === selectedTeam?.id ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rblue-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>

              <div className="mt-10 flex flex-col">
                <label className="text-3xl font-bold text-gray-500">
                  Session name
                </label>
                <div className="flex">
                  <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                    <ClipboardType className="w-1/2 text-lg text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="mt-1 -ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500 md:mt-0 lg:w-1/2 xl:w-2/5"
                    value={sessionInfo.sessionName}
                    onChange={(e) =>
                      setSessionInfo({
                        ...sessionInfo,
                        sessionName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                <label className="text-3xl font-bold text-gray-500">
                  When does it take place ?
                </label>
                <div className="flex gap-8">
                  <DatePicker
                    className={"rouded-lg z-20 border-2 border-gray-200"}
                    value={sessionInfo.sessionDate.toJSDate()}
                    format="dd/MM/yyyy"
                    clearIcon={null}
                    onChange={(newDate: Date) => {
                      if (
                        newDate instanceof Date &&
                        !isNaN(newDate.getMilliseconds())
                      ) {
                        setSessionInfo({
                          ...sessionInfo,
                          sessionDate: DateTime.fromJSDate(newDate),
                        });
                      }
                    }}
                  />
                  <TimePicker
                    className={"rouded-lg z-20 border-2 border-gray-200"}
                    value={sessionInfo.sessionTime.toJSDate()}
                    clearIcon={null}
                    onChange={(newTime) => {
                      if (newTime != null) {
                        const handm = newTime.toString().split(":");
                        setSessionInfo({
                          ...sessionInfo,
                          sessionTime: sessionInfo.sessionTime.set({
                            hour: parseInt(handm[0]),
                            minute: parseInt(handm[1]),
                          }),
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col">
                <label className="text-3xl font-bold text-gray-500">
                  Session place
                </label>
                <div className="flex">
                  <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                    <MapPin className="w-1/2 text-lg text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="mt-1 -ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500 md:mt-0 lg:w-1/2 xl:w-2/5"
                    value={sessionInfo.sessionLocation}
                    onChange={(e) =>
                      setSessionInfo({
                        ...sessionInfo,
                        sessionLocation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-10 flex w-auto flex-col justify-center">
                <label className="text-3xl font-bold text-gray-500">
                  Give some details !
                </label>
                <textarea
                  cols={100}
                  rows={10}
                  className="mt-0 resize-none rounded-lg md:mt-1"
                  value={sessionInfo.sessionDescription}
                  onChange={(e) =>
                    setSessionInfo({
                      ...sessionInfo,
                      sessionDescription: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="-mx-3 mt-8 flex">
                <div className="mb-5 w-full px-3">
                  <button className="mx-auto block w-full max-w-xs rounded-lg bg-rblue-500 px-3 py-3 font-semibold text-white hover:bg-rblue-600 active:bg-rblue-700">
                    Create session
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
