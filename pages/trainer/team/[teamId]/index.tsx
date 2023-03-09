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
  const { teamId } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<any>({
    name: "",
  });
  const [athletesData, setAthletesData] = useState<any>([]);
  const [athletes, setAthletes] = useState<AthleteData[]>([]);
  const [xValuesMean, setXValuesMean] = useState<number[]>([]);
  const [yValuesStressMean, setYValuesStressMean] = useState<number[]>([]);
  const [yValuesTirednessMean, setYValuesTirednessMean] = useState<number[]>(
    [],
  );
  const [yValuesFitnessMean, setYValuesFitnessMean] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await Axios.get(
        `${API_URL}/trainer/teaminformation/?teamId=${teamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success && data.team) {
        setTeam(data.team);
      } else {
        displayToaster("error", "Error on fetching team data");
      }

      Axios.get(`${API_URL}/trainer/feedbackSessions/?teamId=${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setLoading(false);
          const data = res.data;
          if (data.success) {
            setAthletesData(data.athletes);
          } else {
            console.error("error", res.data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
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

  const athletesHeaders = [
    {
      name: "id",
      slug: "userId",
      show: false,
    },
    {
      name: "Name",
      slug: "name",
      show: true,
    },
    {
      name: "Fitness",
      slug: "fitness",
      show: true,
    },
    {
      name: "Tiredness",
      slug: "tiredness",
      show: true,
    },
    {
      name: "Stress",
      slug: "stress",
      show: true,
    },
    {
      name: "Last Update",
      slug: "lastUpdate",
      format: "date",
      show: true,
    },
  ];

  useEffect(() => {
    console.log(athletesData);
    const athletes: any[] = athletesData;

    let datesMean: {
      [key: number]: {
        nFeedbacks: number;
        stress: number;
        tiredness: number;
        fitness: number;
      };
    } = {};

    const xValues: number[] = [];
    const yValuesStress: number[] = [];
    const yValuesTiredness: number[] = [];
    const yValuesFitness: number[] = [];

    athletes.forEach((athlete) => {
      console.log(athlete);
      const feedbacks = athlete.sessionsFeedbacks;
      if (feedbacks) {
        feedbacks.forEach((feedback: any) => {
          if (
            Object.keys(datesMean).includes(
              DateTime.fromISO(feedback.date).toMillis().toString(),
            )
          ) {
            datesMean[
              DateTime.fromISO(feedback.date).toMillis()
            ].nFeedbacks += 1;
            datesMean[DateTime.fromISO(feedback.date).toMillis()].stress +=
              feedback.stress;
            datesMean[DateTime.fromISO(feedback.date).toMillis()].fitness +=
              feedback.shape;
            datesMean[DateTime.fromISO(feedback.date).toMillis()].tiredness +=
              feedback.tiredness;
          } else {
            datesMean = {
              ...datesMean,
              [DateTime.fromISO(feedback.date).toMillis()]: {
                nFeedbacks: 1,
                stress: feedback.stress,
                fitness: feedback.shape,
                tiredness: feedback.tiredness,
              },
            };
          }
        });
      }
    });

    if (Object.keys(datesMean)) {
      Object.keys(datesMean).forEach((dateMean) => {
        // ! dateMean is millis in string
        // Math.round(...*10)/10 used to round at 1 decimal place
        const keyNum: number = parseInt(dateMean);
        datesMean[keyNum].stress =
          Math.round(
            (datesMean[keyNum].stress / datesMean[keyNum].nFeedbacks) * 10,
          ) / 10;
        datesMean[keyNum].fitness =
          Math.round(
            (datesMean[keyNum].fitness / datesMean[keyNum].nFeedbacks) * 10,
          ) / 10;
        datesMean[keyNum].tiredness =
          Math.round(
            (datesMean[keyNum].tiredness / datesMean[keyNum].nFeedbacks) * 10,
          ) / 10;
      });

      const orderedDatesMean = Object.keys(datesMean)
        .sort()
        .reduce((obj: { [key: number]: any }, key) => {
          obj[parseInt(key)] = datesMean[parseInt(key)];
          return obj;
        }, {});

      Object.keys(orderedDatesMean).forEach((dateMean: string) => {
        const dateInNumber: number = parseInt(dateMean);

        xValues.push(dateInNumber);
        yValuesStress.push(orderedDatesMean[dateInNumber].stress);
        yValuesTiredness.push(orderedDatesMean[dateInNumber].tiredness);
        yValuesFitness.push(orderedDatesMean[dateInNumber].fitness);
      });

      setXValuesMean(xValues);
      setYValuesStressMean(yValuesStress);
      setYValuesTirednessMean(yValuesTiredness);
      setYValuesFitnessMean(yValuesFitness);
    }
  }, [athletesData]);

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
              <GoBack path="/trainer/dashboard"></GoBack>

              {team?.name ? (
                <h2 className="mx-4 mb-4 text-3xl font-bold text-rblue-700">
                  <Balancer>{team.name}</Balancer>
                </h2>
              ) : (
                <Skeleton></Skeleton>
              )}
              <div className="flex w-full justify-center">
                <p className="mx-4 text-sm font-bold text-gray-400 sm:text-xl">
                  <Balancer>
                    Below graphics are a mean of the team’s indicators.
                  </Balancer>
                </p>
              </div>

              <div className="mt-5 flex h-auto w-full flex-col flex-wrap justify-center gap-8 lg:h-2/4 lg:flex-row">
                <div className="">
                  <Graphic
                    title="Stress"
                    xValues={xValuesMean}
                    yValues={yValuesStressMean}
                    lineColor={BLUE_LINE_GRAPH}
                    fillColor={BLUE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    title="Tiredness"
                    xValues={xValuesMean}
                    yValues={yValuesTirednessMean}
                    lineColor={ORANGE_LINE_GRAPH}
                    fillColor={ORANGE_FILL_GRAPH}
                  />
                </div>

                <div className="">
                  <Graphic
                    title="Fitness"
                    xValues={xValuesMean}
                    yValues={yValuesFitnessMean}
                    lineColor={VIOLET_LINE_GRAPH}
                    fillColor={VIOLET_FILL_GRAPH}
                  />
                </div>
              </div>
            </section>
            <section className="mb-10 flex w-full flex-col gap-4 px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Athletes</Balancer>
              </h2>

              <div className="flex w-full flex-col">
                <DataGrid
                  header={athletesHeaders}
                  data={athletes}
                  onRowClick={{
                    slug: "userId",
                    path: `/trainer/team/${teamId}/athlete/`,
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
