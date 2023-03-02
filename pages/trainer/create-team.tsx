import Layout from "@/components/layout";
import DataGrid from "@/components/home/data-grid";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import TeamData from "models/team-data";
import DataCreation from "@/components/home/data-creation";
import { useState } from "react";
import DataCreationModel from "models/data-creation-model";

export default function CreateTeam() {
  const router = useRouter();
  const API_URL = process.env.MEJT_API_URL;

  const [teamName, setTeamName] = useState("");

  const handleSubmit = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validData = data.filter(
      (v) =>
        v &&
        v.value &&
        v.value !== "" &&
        v.value.toLowerCase().match(emailRegex),
    );
    if (validData && validData.length === 0) {
      console.error("aucun mail conforme");
      // TODO : red TOAST or red message
    }
  };

  const [data, setData] = useState<DataCreationModel[]>([
    {
      value: "",
      key: "email",
    },
  ]);

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
              <div className="mx-4 mt-4 flex items-center gap-2 text-3xl font-bold text-rblue-700 sm:gap-8">
                <p className="text-xl text-rblue-700">Team name : </p>
                <div className="flex">
                  <input
                    type="name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 text-rblue-700 outline-none placeholder:italic placeholder:text-slate-400 focus:border-rblue-500"
                    placeholder="Team name"
                    required
                  />
                </div>
              </div>
              <div className="mt-8 flex w-full flex-col">
                <DataCreation
                  data={data}
                  dataSetter={setData}
                  header={[
                    {
                      name: "Athletes E-mail",
                      slug: "email",
                      show: true,
                    },
                  ]}
                  dataModel={[
                    {
                      value: "email",
                      key: "email",
                    },
                  ]}
                  onSubmitClick={{
                    path: "/trainer/team/",
                  }}
                />
              </div>
              <div className="mb-5 w-full px-3">
                <button
                  onClick={handleSubmit}
                  className="mx-auto mt-12 block w-full max-w-xs rounded-lg bg-rblue-500 px-3 py-3 font-semibold text-white hover:bg-rblue-600 active:bg-rblue-700"
                >
                  Create Team
                </button>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
