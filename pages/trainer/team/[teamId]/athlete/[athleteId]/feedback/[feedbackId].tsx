import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useRouter } from "next/router";
import BooleanChips from "@/components/home/boolean-chips";
import FeedbackAttribut from "@/components/home/feedback-attribut";
import DisplayLongText from "@/components/home/display-long-text";

export default function SessionDetail({}: {}) {
  const router = useRouter();
  console.log(router.query);
  const { sessionId } = router.query;

  //   Soit affichage du feedback de la session
  //   Soit affichage du formulaire de feedback

  const feedback = {
    sessionId: 0,
    name: "entrainement bas du corps",
    shape: 5,
    tiredness: 8,
    stress: 3,
    sensation:
      "pas au top Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem pas au top Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem pas au top Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ",
    injury: "mollet gauche",
    date: "2012-04-25T18:25:43.511Z",
  };

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
            <section className="mb-10 flex w-full flex-col gap-4 px-8 sm:mx-4">
              <h2 className="text-3xl font-bold text-rblue-700">
                <Balancer>{feedback.name}</Balancer>
              </h2>
              <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                <p className="text-gray-500">{feedback.date}</p>
                <div className="flex gap-4 sm:mx-8">
                  <p className="text-gray-500">Injury</p>
                  <BooleanChips
                    value={feedback.injury === ""}
                    falseString="Yes"
                    trueString="None"
                  ></BooleanChips>
                </div>
              </div>
              <div className="flex w-full flex-wrap justify-center gap-12 ">
                <FeedbackAttribut
                  value={feedback.shape}
                  title="Fitness"
                  icon={"/assets/fitness-icon.png"}
                ></FeedbackAttribut>
                <FeedbackAttribut
                  value={feedback.tiredness}
                  title="Tiredness"
                  icon={"/assets/tiredness-icon.png"}
                ></FeedbackAttribut>
                <FeedbackAttribut
                  value={feedback.stress}
                  title="Stress"
                  icon={"/assets/stress-icon.png"}
                ></FeedbackAttribut>
              </div>

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
