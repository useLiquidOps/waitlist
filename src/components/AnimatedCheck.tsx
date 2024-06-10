import { motion } from "framer-motion";
import { css } from "@linaria/core";

export default function AnimatedCheck() {
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      className={wrapper}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width="22"
      height="2"
      fill="none"
    >
      <motion.path
        d="M6.5 11L9.5 14L15.5 8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={1}
      />
      <motion.path
        d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={0}
      />
    </motion.svg>
  );
}

const wrapper = css`
  display: block;
  width: 3rem;
  height: 3rem;
  color: rgb(var(--theme-color));
  margin: 0 auto;
`;

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 0.5 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.42, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
