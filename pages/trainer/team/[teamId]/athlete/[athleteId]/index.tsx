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
import { useState, useEffect } from "react";
import AthleteData from "models/athlete-data";
import { useRouter } from "next/router";
import Graphic from "@/components/graphics/graphic";
import GoBack from "@/components/home/go-back";

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
import { displayToaster } from "@/lib/utils";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import SessionData from "models/session-data";
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
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const token = getToken();
  const { teamId, athleteId } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<any>({
    name: "",
  });
  // TO BE CHANGED
  const [athletesData, setAthletesData] = useState<any>([]);
  const [athletes, setAthletes] = useState<AthleteData[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const [athlete, setAthlete] = useState<any>(null);
  const [loadingGraphs, setLoadingGraphs] = useState<boolean>(false);

  const [xValues, setXValues] = useState<number[]>([]);
  const [yValuesStress, setYValuesStress] = useState<number[]>([]);
  const [yValuesTiredness, setYValuesTiredness] = useState<number[]>([]);
  const [yValuesFitness, setYValuesFitness] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingGraphs(true);
      Axios.get(
        `${API_URL}/user/feedbackSessions/?teamId=${teamId}&athleteId=${athleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => {
          setLoading(false);
          const data = res.data;
          if (data.success && data.athlete) {
            // setAthletesData(data.athletes);
            setAthlete(data.athlete);
          } else {
            console.error("error", res.data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });

      Axios.get(
        `${API_URL}/athlete/sessions/?teamId=${teamId}&athleteId=${athleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => {
          setLoadingGraphs(false);
          const data = res.data;
          if (data.success && data.sessions) {
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
    };

    if (teamId) {
      fetchData();
    }
  }, [teamId]);

  useEffect(() => {
    const athletes: AthleteData[] = athletesData.map((athlete: any) => {
      const { userId, name, sessionsFeedbacks } = athlete;
      let lastUpdate = "";
      let fitness = 0;
      let tiredness = 0;
      let stress = 0;
      if (sessionsFeedbacks) {
        lastUpdate = sessionsFeedbacks[sessionsFeedbacks.length - 1].date;
        fitness = sessionsFeedbacks[sessionsFeedbacks.length - 1].shape;
        tiredness = sessionsFeedbacks[sessionsFeedbacks.length - 1].tiredness;
        stress = sessionsFeedbacks[sessionsFeedbacks.length - 1].stress;
      }
      return {
        userId,
        name,
        fitness,
        tiredness,
        stress,
        lastUpdate,
      };
    });
    setAthletes(athletes);
  }, [athletesData]);

  useEffect(() => {
    const xValuesIn: number[] = [];

    const yValuesStressIn: number[] = [];
    const yValuesTirednessIn: number[] = [];
    const yValuesFitnessIn: number[] = [];

    athlete?.sessionsFeedbacks.forEach((feedback: any) => {
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

  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <motion.div
          className="w-full md:max-w-full md:px-5 xl:px-0 2xl:max-w-7xl"
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
            className="flex w-full flex-col items-center justify-center py-20 sm:py-32"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <section className="mb-10 w-full sm:mx-4 sm:px-8">
              <GoBack path={`/trainer/team/${teamId}`}></GoBack>

              {athlete ? (
                <h2 className="mx-4 mb-4 text-3xl font-bold text-rblue-700">
                  <Balancer>{athlete.name}</Balancer>
                </h2>
              ) : (
                <Skeleton></Skeleton>
              )}
              <div className="mt-5 flex h-auto w-full flex-col flex-wrap justify-center gap-8 lg:h-2/4 lg:flex-row">
                <div className="">
                  <Graphic
                    loading={loadingGraphs}
                    title="Stress"
                    xValues={xValues}
                    yValues={yValuesStress}
                    lineColor={BLUE_LINE_GRAPH}
                    fillColor={BLUE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    loading={loadingGraphs}
                    title="Tiredness"
                    xValues={xValues}
                    yValues={yValuesTiredness}
                    lineColor={ORANGE_LINE_GRAPH}
                    fillColor={ORANGE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    loading={loadingGraphs}
                    title="Fitness"
                    xValues={xValues}
                    yValues={yValuesFitness}
                    lineColor={VIOLET_LINE_GRAPH}
                    fillColor={VIOLET_FILL_GRAPH}
                  />
                </div>
              </div>
            </section>
            <section className="mb-10 w-full gap-4 px-8 sm:mx-4 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Sessions</Balancer>
              </h2>

              <div className="my-2 flex w-full flex-col">
                <DataGrid
                  header={sessionsHeader}
                  data={sessions}
                  clickCondition={"feedbackProvided"}
                  onRowClick={{
                    slug: "sessionId",
                    path: `/trainer/team/${teamId}/athlete/${athleteId}/feedback/`,
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
