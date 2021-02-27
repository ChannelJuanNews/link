import errorCodes from "./errorCodes";

export default function (error: Object | void | any) {
  if (!error) {
    return {};
  } else {
    for (const [key, value] of Object.entries(errorCodes)) {
      if (Number(key) == Number(error?.code)) {
        return value;
      }
    }
  }
}
