import Layout from "@/components/layout";
import DataGrid from "@/components/home/data-grid";
import { useState, useEffect } from "react";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import TeamData from "models/team-data";
import Axios from "axios";
import { getToken } from "@/lib/auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionButton from "@/components/home/action-button";

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const token = getToken();

  const router = useRouter();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${API_URL}/trainer/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.success) {
          setTeams(res.data.teams);
        } else {
          console.error("error", res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

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
  // const teams: TeamData[] = Array(6).fill({
  //   teamId: "1",
  //   name: "3 IFA",
  //   trainerId: "1",
  //   sessionNumber: 5,
  //   athleteNumber: 10,
  // });
  // teams.push({
  //   teamId: "2",
  //   name: "Les IFA",
  //   trainerId: "1",
  //   sessionNumber: 5,
  //   athleteNumber: 10,
  // });

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
            className="flex w-full flex-col items-center justify-center py-20 sm:py-32"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <section className="mb-10 flex w-full flex-col gap-8 sm:mx-4 sm:gap-4 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <h2 className="mx-4 text-3xl font-bold text-rblue-700">
                  Teams
                </h2>
                <ActionButton
                  onClick={() => router.push("/trainer/create-team")}
                >
                  Create a new team
                </ActionButton>
              </div>

              <div className="flex w-full flex-col">
                {!loading && (
                  <DataGrid
                    header={teamsHeader}
                    data={teams}
                    onRowClick={{
                      slug: "teamId",
                      path: "/trainer/team/",
                    }}
                    emptyString="You don't have any team yet"
                  />
                )}
                {loading && (
                  <Skeleton height={100} style={{ borderRadius: 10 }} />
                )}
              </div>
              <div className="flex w-full justify-center">
                <ActionButton
                  onClick={() => router.push("/trainer/create-session")}
                >
                  Create a new session
                </ActionButton>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
