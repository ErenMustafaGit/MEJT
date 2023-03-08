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

  const [athlete, setAthlete] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
            console.log("data", data);
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

  // TO BE DELETED (DATA REPLACING API CALL)
  const sessions: SessionData[] = Array(6).fill({
    id: "1",
    name: "Entrainement : Bas du corps	1",
    date: "22 Feb 2021",
    location: "Bat Ava Lovelace",
    feedback: true,
  });
  sessions.push({
    id: "2",
    name: "Entrainement : Bas du corps	1",
    date: "22 Feb 2021",
    location: "Bat Ava Lovelace",
    feedback: false,
  });

  const config = {
    title: "Stress",
    xValues: [
      Date.parse("2021-01-20"),
      Date.parse("2022-01-20"),
      Date.parse("2022-07-14"),
      Date.parse("2022-11-15"),
      Date.parse("2022-12-12"),
      Date.parse("2023-02-05"),
      Date.parse("2023-02-15"),
      Date.parse("2023-02-17"),
      Date.parse("2023-02-25"),
      Date.parse("2023-02-27"),
      Date.parse("2023-02-28"),
      Date.now(),
    ],
    yValues: [0, 10, 5, 8, 2, 3, 0, 0, 2, 9, 5, 6],
    lineColor: BLUE_LINE_GRAPH,
    fillColor: BLUE_FILL_GRAPH,
  };

  const config2 = {
    ...config,
    title: "Tiredness",
    lineColor: ORANGE_LINE_GRAPH,
    fillColor: ORANGE_FILL_GRAPH,
  };

  const config3 = {
    ...config,
    title: "Fitness",
    lineColor: VIOLET_LINE_GRAPH,
    fillColor: VIOLET_FILL_GRAPH,
  };

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
                    title={config.title}
                    xValues={config.xValues}
                    yValues={config.yValues}
                    lineColor={config.lineColor}
                    fillColor={config.fillColor}
                  />
                </div>

                <div className="">
                  <Graphic
                    title={config2.title}
                    xValues={config2.xValues}
                    yValues={config2.yValues}
                    lineColor={config2.lineColor}
                    fillColor={config2.fillColor}
                  />
                </div>

                <div className="">
                  <Graphic
                    title={config3.title}
                    xValues={config3.xValues}
                    yValues={config3.yValues}
                    lineColor={config3.lineColor}
                    fillColor={config3.fillColor}
                  />
                </div>
              </div>
            </section>
            <section className="mb-10 w-full px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>Sessions</Balancer>
              </h2>

              <div className="flex w-full flex-col">
                <DataGrid
                  header={sessionsHeader}
                  data={sessions}
                  clickCondition={"feedback"}
                  onRowClick={{
                    slug: "id",
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
