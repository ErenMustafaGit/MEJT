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
import SessionData from "models/session-data";
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
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;

  const [sessions, setSessions] = useState<
    {
      id: number;
      name: string;
      date: string;
      location: string;
      feedback: boolean;
    }[]
  >([]);
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

  const sessionsHeader = [
    {
      name: "id",
      slug: "id",
      size: 1,
      show: false,
    },
    {
      name: "Session name",
      slug: "name",
      size: 2,
      show: true,
    },
    {
      name: "Date",
      slug: "date",
      size: 2,
      show: true,
    },
    {
      name: "Location",
      slug: "location",
      size: 2,
      show: true,
    },
    {
      name: "Feedback",
      slug: "feedback",
      size: 2,
      show: true,
    },
  ];

  const sessionsLess = [
    {
      teamName:
        "l'équipe du dimanche l'équipe du dimanche l'équipe du dimanche",
      sessionId: 20,
      date: "2012-04-28T18:25:43.511Z",
      place: "le stade de sport, 69100 Villeurbanne",
      description: "entrainement du bas du corps en vu de la compétition",
      name: "entrainement pre-compet",
    },
    {
      teamName: "les ours",
      sessionId: 30,
      date: "2012-06-27T18:25:43.511Z",
      place: "la salle de sport, 69000 Lyon",
      description: "entrainement du haut du corps",
      name: "entrainement post-vacances",
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

    athlete?.sessionsFeedbacks.forEach((feedback) => {
      xValuesIn.push(DateTime.fromISO(feedback.date).toMillis());
      yValuesStressIn.push(feedback.stress);
      yValuesTirednessIn.push(feedback.tiredness);
      yValuesFitnessIn.push(feedback.shape);
    });

    setXValues(xValuesIn);
    setYValuesStress(yValuesStressIn);
    setYValuesFitness(yValuesFitnessIn);
    setYValuesTiredness(yValuesTirednessIn);
  }, [athlete]);

  useEffect(() => {
    setLoadingGraphs(true);
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
        if (data.success && data.sessions?.length) {
          console.log("eren", data);
          setSessions(data.sessions);
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
  }, [selectedTeam]);

  useEffect(() => {
    setLoading(true);
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
              <div className="m-6 flex flex-wrap gap-6">
                {sessionsLess.map((session, key) => (
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
              </div>
            </section>
            <section className="mb-10 w-full px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Teams</Balancer>
              </h2>
              <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-5">
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
                {loading && (
                  <Skeleton height={100} className={`rounded-full`} />
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
              )
            </section>
            <section className="mb-10 w-full px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Sessions</Balancer>
              </h2>

              <div className="flex w-full flex-col">
                <DataGrid
                  header={sessionsHeader}
                  data={sessions}
                  onRowClick={{
                    slug: "id",
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
