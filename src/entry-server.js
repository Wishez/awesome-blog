import createApp from "./create-app";

const Regexps = {
  ARTICLE: /^\/read\/[\w]+$/,
  FEED: /^\/$/
};
const Names = {
  FEED: "BlogFeed",
  POST: "BlogPost"
};

export default request => {
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp();
    const { url } = request;
    router.push(url);
    request.meta = app.$meta();

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      // нет подходящих маршрутов, отклоняем с 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      const testUrl = regexp => regexp.test(url);
      Promise.all(
        matchedComponents.map(Blog => {
          const { components } = Blog;
          let Component;
          switch (true) {
            case testUrl(Regexps.FEED):
              Component = components[Names.FEED];
              break;

            case testUrl(Regexps.ARTICLE):
              Component = components[Names.POST];
              break;

            default:
              Component = components[Names.FEED];
          }

          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
              methods: Component.methods
            });
          }
        })
      )
        .then(() => {
          request.state = store.state;
          resolve(app);
          app.$mount("#app", true);
        })
        .catch(reject);
    }, reject);
  });
};
