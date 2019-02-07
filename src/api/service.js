import ax from "./axios";

export function getTags(params) {
  return ax.get("/tags", { params }).then(res => res.data);
}

export function getArticles(params) {
  return ax.get("/article", { params }).then(res => res.data);
}

export function getArticle(data) {
  return ax.get(`/article/${data.slug}`).then(res => res.data);
}

export function likeArticle(data) {
  return ax.post(`/like`, data).then(res => res.data);
}
