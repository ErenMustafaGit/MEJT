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
  const API_URL = process.env.MEJT_API_URL;
  ["id", "name", "date", "location", "feedback"];
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
            <section className="mb-10 w-full sm:mx-4 sm:px-8">
              <h2 className="mx-4 text-3xl font-bold text-rblue-700">
                <Balancer>Teams</Balancer>
              </h2>
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
