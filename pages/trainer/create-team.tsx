import Layout from "@/components/layout";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import DataCreation from "@/components/home/data-creation";
import { useState } from "react";
import DataCreationModel from "models/data-creation-model";
import { displayToaster, mailMatcher } from "@/lib/utils";
import Axios from "axios";
import { getToken } from "@/lib/auth";
import GoBack from "@/components/home/go-back";

export default function CreateTeam() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const token = getToken();

  const [teamName, setTeamName] = useState("");

  const submitCreation = async (e: any) => {
    e.preventDefault();
    const validData = data.filter(
      (v) => v && v.value && v.value !== "" && mailMatcher(v.value),
    );
    if (validData && validData.length === 0) {
      displayToaster("error", "No valid email");
    }

    if (!(!teamName || teamName === "" || validData.length === 0)) {
      const athletesMails: {
        email: string;
      }[] = validData.map((v) => {
        return { email: v.value };
      });

      try {
        const { data } = await Axios.post(
          `${API_URL}/trainer/teams/create`,
          {
            name: teamName,
            athletes: athletesMails,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (data.success) {
          displayToaster("success", "Team created");
          if (data.teamId) {
            router.push(`/trainer/teams/${data.teamId}`);
          } else {
            router.push(`/trainer/dashboard`);
          }
        } else {
          displayToaster("error", "Error while creating team");
        }
      } catch (error) {
        if (Axios.isAxiosError(error)) {
          console.error(error);
          displayToaster(
            "error",
            `Error while creating team : ${error?.message}}`,
          );
        } else {
          console.error(error);
          displayToaster("error", `Error while creating team : ${error}}`);
        }
      }
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
            className="flex w-full flex-col items-center justify-center py-20 md:py-32"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <section className="mb-10 w-full sm:mx-4 sm:px-8">
              <GoBack path="/trainer/dashboard"></GoBack>
              <h2 className="mx-4 text-3xl font-bold text-rblue-700">
                <Balancer>Team creation</Balancer>
              </h2>
              <div className="mx-4 mt-4 flex items-center gap-2 text-3xl font-bold text-rblue-700 sm:gap-8">
                <p className="text-sm text-rblue-700 sm:text-xl">
                  Team name :{" "}
                </p>
                <div className="flex">
                  <input
                    type="name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 text-sm text-rblue-700 outline-none placeholder:italic placeholder:text-slate-400 focus:border-rblue-500 sm:text-lg"
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
                  onClick={submitCreation}
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
