import Layout from "@/components/layout";
import DataGrid from "@/components/home/data-grid";
import Link from "next/link";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS, BLUE_FILL_GRAPH, BLUE_LINE_GRAPH, FADE_DOWN_ANIMATION_VARIANTS, ORANGE_FILL_GRAPH, ORANGE_LINE_GRAPH, VIOLET_FILL_GRAPH, VIOLET_LINE_GRAPH } from "@/lib/constants";
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export default function Login() {
  const router = useRouter();
  const API_URL = process.env.MEJT_API_URL;

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
  
  const sessions = [
  {
    teamName: "l'équipe du dimanche l'équipe du dimanche l'équipe du dimanche",
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

  const config = 
  {
    title:"Stress",
    xValues:[
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
       Date.now()
      ],
    yValues:[0,10,5,8,2,3,0,0,2,9,5,6],
    lineColor:BLUE_LINE_GRAPH,
    fillColor:BLUE_FILL_GRAPH
  };

  const config2 ={
    ...config,
    title:'Tiredness',
    lineColor:ORANGE_LINE_GRAPH,
    fillColor:ORANGE_FILL_GRAPH
  };

  const config3 = {
    ...config,
    title:'Fitness',
    lineColor:VIOLET_LINE_GRAPH,
    fillColor:VIOLET_FILL_GRAPH
  };

  return (
    <Layout>
      <motion.div
        className="flex w-full flex-row"
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
          <section className="mx-4 mb-10 w-full px-8">
            <h2 className="text-3xl font-bold text-rblue-700">
              <Balancer>Feedback less sessions</Balancer>
            </h2>
            <div className="m-6 flex flex-wrap gap-6">
              {sessions.map((session, key) => (
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
          <section className="mx-4 mb-10 w-full px-8">
            <h2 className="text-3xl font-bold text-rblue-700">
              <Balancer>Teams</Balancer>
            </h2>
            <div className="flex flex-col lg:flex-row w-full h-auto lg:h-2/4 mt-5">
              <div className="w-full lg:w-1/3 h-auto lg:h-2/4">
              <Graphic
                title={config.title}
                xValues={config.xValues}
                yValues={config.yValues}
                lineColor={config.lineColor}
                fillColor={config.fillColor}
               />
              </div>

              <div className="w-full lg:w-1/3 h-auto lg:h-2/4">
                <Graphic
                title={config2.title}
                xValues={config2.xValues}
                yValues={config2.yValues}
                lineColor={config2.lineColor}
                fillColor={config2.fillColor}
                />
              </div>

              <div className="w-full lg:w-1/3 h-auto lg:h-2/4">
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
          <section className="mx-4 mb-10 w-full px-8">
            <h2 className="text-3xl font-bold text-rblue-700">
              <Balancer>Sessions</Balancer>
            </h2>


            <div className="flex w-full flex-col">
              <DataGrid
                header={["id", "name", "date", "location", "feedback"]}
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
    </Layout>
  );
}
