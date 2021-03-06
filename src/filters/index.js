import Vue from "vue";
import moment from "moment";

const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

Vue.filter(
  "fixSum",
  (sum, numbersAfterDot = 2) =>
    typeof sum === "string" ? sum : +sum.toFixed(numbersAfterDot)
);

Vue.filter("formatDate", (date, format = "L") => {
  if (typeof date === "string") {
    date = date.replace(/[-\.]/g, "/");
  }

  return moment(date).formate(format);
  // .tz(currentTimeZone)
});
