import ax from "./axios";

const request = ({ url, params, payload, method = "get" }) => {
  const args = [url];
  if (params) args.push({ params });
  if (payload) args.push(payload);
  return ax[method](...args).then(res => res.data);
};

const getTags = params => request({ url: "/tags", params });
const getArticles = params => request({ url: "/article", params });
const getArticle = slug => request({ url: `/article/${slug}` });
const likeArticle = payload => reequest({ url: "/like", payload });

export { getTags, getArticles, getArticle, likeArticle };
