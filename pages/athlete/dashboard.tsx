import Layout from "@/components/layout";
import DataGrid from "@/components/home/data-grid";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import {
  BLUE_FILL_GRAPH,
  BLUE_LINE_GRAPH,
  FADE_DOWN_ANIMATION_VARIANTS,
  ORANGE_FILL_GRAPH,
  ORANGE_LINE_GRAPH,
  VIOLET_FILL_GRAPH,
  VIOLET_LINE_GRAPH,
} from "@/lib/constants";
import { useRouter } from "next/router";
import Graphic from "@/components/graphics/graphic";
import SessionCard from "@/components/home/session-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useState, useEffect } from "react";

import { displayToaster } from "@/lib/utils";

import Axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getToken } from "@/lib/auth";
import { DateTime } from "luxon";
import SessionData from "models/session-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  const router = useRouter();
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [loadingGraphs, setLoadingGraphs] = useState(false);
  const [loadingFeedbackLess, setLoadingFeedbackLess] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;

  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [athlete, setAthlete] = useState<{
    email: string;
    lastUpdate: string;
    name: string;
    sessionsFeedbacks: {
      sessionId: number;
      name: string;
      shape: number;
      tiredness: number;
      stress: number;
      sensation: string;
      injury: string;
      date: string;
    }[];
  }>();

  const [xValues, setXValues] = useState<number[]>([]);
  const [yValuesStress, setYValuesStress] = useState<number[]>([]);
  const [yValuesTiredness, setYValuesTiredness] = useState<number[]>([]);
  const [yValuesFitness, setYValuesFitness] = useState<number[]>([]);
  const [feedbackLess, setFeedbackLess] = useState<any>([]);

  const sessionsHeader = [
    {
      name: "sessionId",
      slug: "sessionId",
      show: false,
    },
    {
      name: "teamId",
      slug: "teamId",
      show: false,
    },
    {
      name: "Description",
      slug: "description",
      show: true,
    },
    {
      name: "teamName",
      slug: "teamName",
      show: false,
    },
    {
      name: "Date",
      slug: "date",
      format: "date",
      show: true,
    },
    {
      name: "Place",
      slug: "place",
      show: true,
    },
    {
      name: "Feedback",
      slug: "feedbackProvided",
      show: true,
    },
  ];

  const [teams, setTeams] = useState<{ teamId: number; teamName: string }[]>(
    [],
  );
  const [selectedTeam, setSelectedTeam] = useState<number>();

  useEffect(() => {
    const xValuesIn: number[] = [];
    const yValuesStressIn: number[] = [];
    const yValuesTirednessIn: number[] = [];
    const yValuesFitnessIn: number[] = [];

    let datesForSort: {
      [key: number]: {
        stress: number;
        tiredness: number;
        fitness: number;
      };
    } = {};

    athlete?.sessionsFeedbacks.forEach((feedback) => {

      sessions.forEach((session) => {
        if(session.sessionId == feedback.sessionId)
        {
          datesForSort[DateTime.fromISO(session.date).toMillis()] = {
            stress:feedback.stress,
            tiredness:feedback.tiredness,
            fitness:feedback.shape
          }
        }
      })

    });

    const orderedDates = Object.keys(datesForSort)
      .sort()
      .reduce((obj: { [key: number]: any }, key) => {
        obj[parseInt(key)] = datesForSort[parseInt(key)];
        return obj;
      }, {});

      Object.keys(orderedDates).forEach((date: string) => {
      const dateInNumber: number = parseInt(date);

      xValuesIn.push(dateInNumber);
      yValuesStressIn.push(orderedDates[dateInNumber].stress);
      yValuesTirednessIn.push(orderedDates[dateInNumber].tiredness);
      yValuesFitnessIn.push(orderedDates[dateInNumber].fitness);

    });

    setXValues(xValuesIn);
    setYValuesStress(yValuesStressIn);
    setYValuesFitness(yValuesFitnessIn);
    setYValuesTiredness(yValuesTirednessIn);
  }, [athlete, sessions]);

  useEffect(() => {
    setLoadingGraphs(true);

    if (selectedTeam) {
      Axios.get(`${API_URL}/user/feedbackSessions/?teamId=${selectedTeam}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setLoadingGraphs(false);
          const data = res.data;
          if (data.success && data.athlete) {
            setAthlete(data.athlete);
          } else {
            displayToaster("error", "Error while fetching data");
            console.error("error", res.data.error);
          }
        })
        .catch((err) => {
          setLoadingGraphs(false);
          console.log(err);
          displayToaster("error", "Error while fetching data");
        });

      Axios.get(`${API_URL}/athlete/sessions/?teamId=${selectedTeam}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setLoadingGraphs(false);
          const data = res.data;
          if (data.success) {
            setSessions(data.sessions);
          } else {
            if (!data.success) {
              displayToaster("error", "Error while fetching data");
              console.error("error", res.data.error);
            }
          }
        })
        .catch((err) => {
          setLoadingGraphs(false);
          console.log(err);
          displayToaster("error", "Error while fetching data");
        });
    }
  }, [selectedTeam]);

  useEffect(() => {
    setLoading(true);

    setLoadingFeedbackLess(true);
    // Getting feedbackLess sessions
    Axios.get(`${API_URL}/athlete/feedbackSession/notProvided`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const data = res.data;
        setLoadingFeedbackLess(false);
        if (data.success && data.sessions) {
          setFeedbackLess(data.sessions);
        } else {
          displayToaster("error", "Error while fetching data");
          console.error("error", res.data.error);
        }
      })
      .catch((err) => {
        setLoadingFeedbackLess(false);
        console.log(err);
        displayToaster("error", "Error while fetching data");
      });

    Axios.get(`${API_URL}/athlete/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          const allTeams = response.data.teams;
          const prettyTeams: { teamId: number; teamName: string }[] =
            allTeams.map((team: any) => {
              return {
                teamName: team.name,
                teamId: team.teamId,
              };
            });
          setSelectedTeam(prettyTeams[0].teamId);
          setTeams(prettyTeams);
        } else {
          console.error("error", response.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const updateButtonsAndData = (teamId: number) => {
    setSelectedTeam(teamId);
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <motion.div
          className="max-w-full md:px-5 xl:px-0 2xl:max-w-7xl"
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
            className="flex w-full flex-col items-center justify-center py-32"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <section className="mb-10 w-full px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Feedback less sessions</Balancer>
              </h2>

              {!loadingFeedbackLess && (
                <motion.div
                  className="m-6 flex flex-wrap gap-6"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  {feedbackLess.map((session: any, key: number) => (
                    <SessionCard
                      key={key}
                      id={session.sessionId}
                      place={session.place}
                      date={session.date}
                      description={session.description}
                      name={session.name}
                      teamName={session.teamName}
                    />
                  ))}
                </motion.div>
              )}
              {loadingFeedbackLess && (
                <div className="m-6 flex w-full gap-6">
                  <div className="w-full">
                    <Skeleton height={80} style={{ borderRadius: 10 }} />
                  </div>
                  <div className="w-full">
                    <Skeleton height={80} style={{ borderRadius: 10 }} />
                  </div>
                  <div className="w-full">
                    <Skeleton height={80} style={{ borderRadius: 10 }} />
                  </div>
                </div>
              )}
            </section>
            <section className="mb-10 w-full px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Teams</Balancer>
              </h2>
              <motion.div
                className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-5"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                {!loading &&
                  teams.length != 0 &&
                  teams.map((team) => {
                    return (
                      <button
                        key={team.teamId}
                        className={`rounded-full border ${
                          team.teamId === selectedTeam
                            ? "border-rblue-600 bg-rblue-600"
                            : "border-rblue-500 bg-rblue-500"
                        } mr-2 p-1 px-2 text-center text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600`}
                        onClick={() => updateButtonsAndData(team.teamId)}
                      >
                        {team.teamName}
                      </button>
                    );
                  })}
              </motion.div>
              <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-5">
                {loading && (
                  <div className="flex w-full gap-6">
                    <div className="w-full">
                      <Skeleton
                        height={50}
                        width={200}
                        style={{ borderRadius: 50 }}
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        height={50}
                        width={200}
                        style={{ borderRadius: 50 }}
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        height={50}
                        width={200}
                        style={{ borderRadius: 50 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 flex h-auto w-full flex-col flex-wrap justify-center gap-8 lg:h-2/4 lg:flex-row">
                <div className="">
                  <Graphic
                    title="Stress"
                    loading={loadingGraphs}
                    xValues={xValues}
                    yValues={yValuesStress}
                    lineColor={BLUE_LINE_GRAPH}
                    fillColor={BLUE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    title="Tiredness"
                    loading={loadingGraphs}
                    xValues={xValues}
                    yValues={yValuesTiredness}
                    lineColor={ORANGE_LINE_GRAPH}
                    fillColor={ORANGE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    title="Fitness"
                    loading={loadingGraphs}
                    xValues={xValues}
                    yValues={yValuesFitness}
                    lineColor={VIOLET_LINE_GRAPH}
                    fillColor={VIOLET_FILL_GRAPH}
                  />
                </div>
              </div>
            </section>
            <section className="mb-10 w-full gap-4 px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Sessions</Balancer>
              </h2>

              <div className="flex w-full flex-col">
                <DataGrid
                  header={sessionsHeader}
                  data={sessions}
                  onRowClick={{
                    slug: "sessionId",
                    path: "/athlete/session/",
                  }}
                />
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
