import Layout from "@/components/layout";
import Link from "next/link";

import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { BLUE_FILL_GRAPH, BLUE_LINE_GRAPH, FADE_DOWN_ANIMATION_VARIANTS, ORANGE_FILL_GRAPH, ORANGE_LINE_GRAPH, VIOLET_FILL_GRAPH, VIOLET_LINE_GRAPH } from "@/lib/constants";
import { useRouter } from "next/router";
import Graphic from "@/components/graphics/graphic";

import {} from "@/lib/constants";

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
  const config = 
  {
    title:"Stress",
    xValues:[Date.parse("2023-01-20"), Date.parse("2023-02-15"), Date.parse("2023-02-20"), Date.parse("2023-02-23"), Date.parse("2023-02-24"), Date.now()],
    yValues:[0,10,5,8,2,3],
    lineColor:BLUE_LINE_GRAPH,
    fillColor:BLUE_FILL_GRAPH
  };

  const config2 ={
    title:"Tiredness",
    xValues:[Date.parse("2023-01-20"), Date.parse("2023-02-15"), Date.parse("2023-02-20"), Date.parse("2023-02-23"), Date.parse("2023-02-24"), Date.now()],
    yValues:[0,10,5,8,2,3],
    lineColor:ORANGE_LINE_GRAPH,
    fillColor:ORANGE_FILL_GRAPH
  };

  const config3 = {
    title:"Fitness",
    xValues:[Date.parse("2023-01-20"), Date.parse("2023-02-15"), Date.parse("2023-02-20"), Date.parse("2023-02-23"), Date.parse("2023-02-24"), Date.now()],
    yValues:[0,10,5,8,2,3],
    lineColor:VIOLET_LINE_GRAPH,
    fillColor:VIOLET_FILL_GRAPH
  };

  return (
    <Layout>
      <motion.div
        className="flex w-full flex-row "
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
        </motion.div>
      </motion.div>
    </Layout>
  );
}
