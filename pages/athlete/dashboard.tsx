import Layout from "@/components/layout";
import Link from "next/link";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import SessionCard from "@/components/home/session-card";

const sessions = [
  {
    id: 20,
    date: "2012-04-28T18:25:43.511Z",
    place: "le stade de sport, 69100 Villeurbanne",
    description: "entrainement du bas du corps en vu de la compétition",
    name: "entrainement pre-compet",
  },
  {
    id: 30,
    date: "2012-06-27T18:25:43.511Z",
    place: "la salle de sport, 69000 Lyon",
    description: "entrainement du haut du corps",
    name: "entrainement post-vacances",
  },
  {
    id: 30,
    date: "2012-06-27T18:25:43.511Z",
    place: "la salle de sport, 69000 Lyon",
    description: "entrainement du haut du corps",
    name: "entrainement post-vacances",
  },
  {
    id: 30,
    date: "2012-06-27T18:25:43.511Z",
    place: "la salle de sport, 69000 Lyon",
    description: "entrainement du haut du corps",
    name: "entrainement post-vacances",
  },
];

export default function Login() {
  const API_URL = process.env.MEJT_API_URL;
  const router = useRouter();

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
                  id={session.id}
                  place={session.place}
                  date={session.date}
                  description={session.description}
                  name={session.name}
                />
              ))}
            </div>
          </section>
          <section className="mx-4 mb-10 w-full px-8">
            <h2 className="text-3xl font-bold text-rblue-700">
              <Balancer>Teams</Balancer>
            </h2>
          </section>
          <section className="mx-4 mb-10 w-full px-8">
            <h2 className="text-3xl font-bold text-rblue-700">
              <Balancer>Sessions</Balancer>
            </h2>
          </section>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
