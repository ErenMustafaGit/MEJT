import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import BooleanChips from "@/components/home/boolean-chips";
import FeedbackAttribut from "@/components/home/feedback-attribut";
import DisplayLongText from "@/components/home/display-long-text";
import GoBack from "@/components/home/go-back";
import { useState, useEffect } from "react";

import { displayToaster, formatPrettyDate } from "@/lib/utils";

import { Switch } from "@headlessui/react";

import Axios from "axios";

import { getToken } from "@/lib/auth";
import Skeleton from "react-loading-skeleton";
import { DateTime } from "luxon";

import FeedbackSlider from "@/components/home/sliderFeedback";

export default function SessionDetail({}: {}) {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const token = getToken();
  const { slug } = router.query;

  const [fitnessLevel, setFitnessLevel] = useState<number>(5);
  const [tirednessLevel, setTirednessLevel] = useState<number>(5);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [injured, setInjured] = useState<boolean>(false);
  const [injuryDesc, setInjuryDesc] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const [feedbackIfGiven, setFeedbackIfGiven] = useState<{
    sessionId: number;
    name: string;
    shape: number;
    tiredness: number;
    stress: number;
    sensation: string;
    injury: string;
    date: string;
  }>({
    sessionId: -1,
    name: "",
    shape: 0,
    tiredness: 0,
    stress: 0,
    sensation: "",
    injury: "",
    date: DateTime.now().toString(),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [feedbackGiven, setFeedbackGiven] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Axios.get(`${API_URL}/user/singleFeedbackSession?sessionId=${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            if (data.sessionFeedback === null) {
              setFeedbackGiven(false);
            } else {
              setFeedbackGiven(true);
              setFeedbackIfGiven(data.sessionFeedback);
            }
          } else {
            displayToaster("error", "Error while fetching data");
            console.error("error", res.data.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          displayToaster("error", "Error while fetching data");
        });
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const onClickSubmitFeedback = async () => {
    if (
      stressLevel !== undefined &&
      stressLevel >= 0 &&
      stressLevel <= 10 &&
      tirednessLevel !== undefined &&
      tirednessLevel >= 0 &&
      tirednessLevel <= 10 &&
      fitnessLevel !== undefined &&
      fitnessLevel >= 0 &&
      fitnessLevel <= 10 &&
      injuryDesc !== undefined &&
      details !== undefined
    ) {
      try {
        const res = await Axios.post(
          `${API_URL}/athlete/feedbackSession/create`,
          {
            sessionId: slug,
            shape: fitnessLevel,
            tiredness: tirednessLevel,
            stress: stressLevel,
            sensation: details,
            injury: injuryDesc,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        console.log(res);
        if (res.data.success) {
          displayToaster("success", "Feedback given");
          router.push(`/athlete/dashboard`);
        }
      } catch (error) {
        if (Axios.isAxiosError(error)) {
          console.error(error);
          displayToaster(
            "error",
            `Error while posting feedback : ${error?.message}}`,
          );
        } else {
          console.error(error);
          displayToaster("error", `Error while posting feedback : ${error}}`);
        }
      }
    } else {
      displayToaster("error", "Incorrect values for feedback");
    }
  };

  return (
    <Layout>
      {loading && (
        <div className="m-8 w-full py-32">
          <Skeleton height={100} style={{ borderRadius: 10 }} />
        </div>
      )}

      {feedbackGiven && !loading && (
        <div className="flex w-full flex-col items-center justify-center">
          <motion.div
            className="flex w-full justify-center md:px-5 xl:px-0 2xl:max-w-7xl"
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
              className="flex w-full flex-col py-20 md:py-32"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <div className="">
                <GoBack path="/athlete/dashboard" />
              </div>
              <section className="mb-10 flex w-full flex-col gap-4 px-8 sm:mx-4">
                <h2 className="text-3xl font-bold text-rblue-700">
                  <Balancer>{feedbackIfGiven.name}</Balancer>
                </h2>
                <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                  <p className="text-gray-500">
                    {formatPrettyDate(feedbackIfGiven.date)}
                  </p>
                  <div className="flex gap-4 sm:mx-8">
                    <p className="text-gray-500">Injury</p>
                    <BooleanChips
                      value={feedbackIfGiven.injury === ""}
                      falseString="Yes"
                      trueString="None"
                    ></BooleanChips>
                  </div>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-12 ">
                  <FeedbackAttribut
                    inverted={false}
                    value={feedbackIfGiven.shape}
                    title="Fitness"
                    icon={"/assets/fitness-icon.png"}
                  ></FeedbackAttribut>
                  <FeedbackAttribut
                    inverted={true}
                    value={feedbackIfGiven.tiredness}
                    title="Tiredness"
                    icon={"/assets/tiredness-icon.png"}
                  ></FeedbackAttribut>
                  <FeedbackAttribut
                    inverted={true}
                    value={feedbackIfGiven.stress}
                    title="Stress"
                    icon={"/assets/stress-icon.png"}
                  ></FeedbackAttribut>
                </div>

                <div className="mt-4 flex w-full flex-col gap-12">
                  {feedbackIfGiven.injury !== "" && (
                    <DisplayLongText
                      text={feedbackIfGiven.injury}
                      title="Injury details"
                    ></DisplayLongText>
                  )}
                  <DisplayLongText
                    text={feedbackIfGiven.sensation}
                    title="Detailed feedback"
                  ></DisplayLongText>
                </div>
              </section>
            </motion.div>
          </motion.div>
        </div>
      )}

      {!feedbackGiven && !loading && (
        <div className="flex justify-center px-4 xl:px-36">
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
              className="flex flex-col py-20 md:py-32"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <section className="flex flex-col gap-4 px-8 sm:mx-4">
                <div className="">
                  <GoBack path="/athlete/dashboard" />
                </div>

                <h1 className="w-full text-center text-3xl font-bold text-rblue-500">
                  Give your session feedback ! 🙌
                </h1>

                <FeedbackSlider
                  inverted={false}
                  title="Fitness"
                  lowBoundText="Feeling bad..."
                  highBoundText="Feeling well !"
                  dynamicValue={fitnessLevel}
                  valueChangeCallback={setFitnessLevel}
                  className="mt-10"
                />

                <FeedbackSlider
                  inverted={true}
                  title="Level of tiredness"
                  lowBoundText="Fresh !"
                  highBoundText="Tired..."
                  dynamicValue={tirednessLevel}
                  valueChangeCallback={setTirednessLevel}
                  className="mt-10"
                />

                <FeedbackSlider
                  inverted={true}
                  title="Level of stress"
                  lowBoundText="Zen !"
                  highBoundText="Very stressed !"
                  dynamicValue={stressLevel}
                  valueChangeCallback={setStressLevel}
                  className="mt-10"
                />

                <div className="mt-5 flex w-full flex-row items-center justify-center">
                  <p className="-mt-1 font-bold">Injured ?</p>
                  <Switch
                    checked={injured}
                    onChange={setInjured}
                    className={`${
                      injured ? "bg-blue-500" : "bg-gray-200"
                    } relative ml-2 inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        injured ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>

                {injured && (
                  <textarea
                    cols={100}
                    rows={5}
                    className="mt-0 resize-none rounded-lg md:mt-1"
                    value={injuryDesc}
                    onChange={(e) => setInjuryDesc(e.target.value)}
                    placeholder="Write here the details of your injury"
                  ></textarea>
                )}

                <textarea
                  cols={100}
                  rows={10}
                  className="mt-0 resize-none rounded-lg md:mt-1"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Write here the details of your session"
                ></textarea>

                <div className="-mx-3 mt-8 flex">
                  <div className="mb-5 w-full px-3">
                    <button
                      className="mx-auto block w-full max-w-xs rounded-lg bg-rblue-500 px-3 py-3 font-semibold text-white hover:bg-rblue-600 active:bg-rblue-700"
                      onClick={onClickSubmitFeedback}
                    >
                      Submit feedback
                    </button>
                  </div>
                </div>

                <p className="hidden text-red-800 text-red-700 text-red-600/80 text-orange-500 text-orange-400 text-yellow-400 text-green-400/70 text-green-400 text-green-600/80 text-green-600 text-green-700">
                  hidden
                </p>
              </section>
            </motion.div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
