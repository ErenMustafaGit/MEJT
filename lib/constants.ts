export const ATHLETE = 1;
export const TRAINER = 0;

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const BLUE_LINE_GRAPH = "rgba(7, 103 , 191 , 1)";
export const BLUE_FILL_GRAPH = "rgba(7, 103 , 191 , 0.3)";

export const ORANGE_LINE_GRAPH = "rgba(232, 79, 15, 1)";
export const ORANGE_FILL_GRAPH = "rgba(232, 79, 15, 0.3)";

export const VIOLET_LINE_GRAPH = "rgba(93, 95, 239, 1)";
export const VIOLET_FILL_GRAPH = "rgba(93, 95, 239, 0.3)";
