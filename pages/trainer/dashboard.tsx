import Layout from "@/components/layout";
import DataGrid from "@/components/home/data-grid";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import TeamData from "models/team-data";

export default function Dashboard() {
  const router = useRouter();
  const API_URL = process.env.MEJT_API_URL;

  const teamsHeader = [
    {
      name: "Team Id",
      slug: "teamId",
      size: 1,
      show: false,
    },
    {
      name: "Trainer Id",
      slug: "trainerId",
      size: 1,
      show: false,
    },
    {
      name: "Team Name",
      slug: "name",
      size: 2,
      show: true,
    },
    {
      name: "Number of sessions",
      slug: "sessionNumber",
      size: 2,
      show: true,
    },
    {
      name: "Number of athletes",
      slug: "athleteNumber",
      size: 2,
      show: true,
    },
  ];

  // TO BE DELETED (DATA REPLACING API CALL)
  const teams: TeamData[] = Array(6).fill({
    teamId: "1",
    name: "3 IFA",
    trainerId: "1",
    sessionNumber: 5,
    athleteNumber: 10,
  });
  teams.push({
    teamId: "2",
    name: "Les IFA",
    trainerId: "1",
    sessionNumber: 5,
    athleteNumber: 10,
  });

  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <motion.div
          className="w-full max-w-full md:px-5 xl:px-0 2xl:max-w-7xl"
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
            <section className="mb-10 w-full sm:mx-4 sm:px-8">
              <h2 className="mx-4 text-3xl font-bold text-rblue-700">
                <Balancer>Teams</Balancer>
              </h2>
              <div className="mt-8 flex w-full flex-col">
                <DataGrid
                  header={teamsHeader}
                  data={teams}
                  onRowClick={{
                    slug: "teamId",
                    path: "/trainer/team/",
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
