import animateScroll from "scrollto-with-animation";

const scrollTo = (pos, duration = 600, delay = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      animateScroll(
        document.documentElement,
        "scrollTop",
        pos,
        duration,
        "easeInOutSine",
        resolve
      );
    }, delay);
  });

const kebabify = words => words.toLowerCase().replace(" ", "-");

const prettyDate = date =>
  new Date(date)
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ")
    .replace(/( \d+)$/, ",$1");

const setTitle = title => {
  document.title = title;
};

export { kebabify, prettyDate, scrollTo, setTitle };
