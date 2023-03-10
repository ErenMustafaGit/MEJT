import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import BooleanChips from "@/components/home/boolean-chips";
import FeedbackAttribut from "@/components/home/feedback-attribut";
import DisplayLongText from "@/components/home/display-long-text";
import GoBack from "@/components/home/go-back";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import Axios from "axios";
import { displayToaster, formatPrettyDate } from "@/lib/utils";
import { DateTime } from "luxon";
import { Oval } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";

export default function SessionDetail({}: {}) {
  const router = useRouter();
  const { teamId, athleteId, feedbackId } = router.query;
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const token = getToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<any>({
    sessionId: -1,
    name: "Error on loading",
    shape: 0,
    tiredness: 0,
    stress: 0,
    sensation: "",
    injury: "",
    date: DateTime.now().toString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // GET FEEDBACK FOR A SPECIFIC SESSION OF A SPECIFIQUE ATHLETE
      Axios.get(
        `${API_URL}/user/singleFeedbackSession?sessionId=${feedbackId}&athleteId=${athleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((res) => {
          const data = res.data;
          if (data.success) {
            if (data.sessionFeedback === null) {
              displayToaster("error", "Error : no feedback found");
            } else {
              setFeedback(data.sessionFeedback);
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
    if (feedbackId) {
      fetchData();
    }
  }, [feedbackId]);

  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center">
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
            className="flex w-full flex-col py-20 md:py-32"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="">
              <GoBack path={`/trainer/team/${teamId}/athlete/${athleteId}`} />
            </div>

            <section className="mb-10 flex w-full flex-col gap-4 px-8 sm:mx-4">
              {loading ? (
                <Skeleton></Skeleton>
              ) : (
                <h2 className="text-3xl font-bold text-rblue-700">
                  <Balancer>{feedback.name}</Balancer>
                </h2>
              )}

              <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                <p className="text-gray-500">
                  {formatPrettyDate(feedback.date)}
                </p>
                <div className="flex gap-4 sm:mx-8">
                  <p className="text-gray-500">Injury</p>
                  <BooleanChips
                    value={feedback.injury === ""}
                    falseString="Yes"
                    trueString="None"
                  ></BooleanChips>
                </div>
              </div>

              {loading ? (
                <div className="flex w-full flex-wrap justify-center gap-12 ">
                  <Oval
                    height={80}
                    width={80}
                    color="#0767BF"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#0076FF"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : (
                <div className="flex w-full flex-wrap justify-center gap-12 ">
                  <FeedbackAttribut
                    inverted={false}
                    value={feedback.shape}
                    title="Fitness"
                    icon={"/assets/fitness-icon.png"}
                  ></FeedbackAttribut>
                  <FeedbackAttribut
                    inverted={true}
                    value={feedback.tiredness}
                    title="Tiredness"
                    icon={"/assets/tiredness-icon.png"}
                  ></FeedbackAttribut>
                  <FeedbackAttribut
                    inverted={true}
                    value={feedback.stress}
                    title="Stress"
                    icon={"/assets/stress-icon.png"}
                  ></FeedbackAttribut>
                </div>
              )}

              <div className="mt-4 flex w-full flex-col gap-12">
                {feedback.injury !== "" && (
                  <DisplayLongText
                    text={feedback.injury}
                    title="Injury details"
                  ></DisplayLongText>
                )}
                <DisplayLongText
                  text={feedback.sensation}
                  title="Detailed feedback"
                ></DisplayLongText>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
