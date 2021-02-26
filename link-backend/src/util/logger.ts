import debug from "debug";
// create logger for main function
export const LOGGER = debug("MAIN");
export const ERROR = LOGGER.extend(":ERROR");
export const WARN = LOGGER.extend(":WARN");
