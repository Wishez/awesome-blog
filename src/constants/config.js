const IS_DEV = process.env.NODE_ENV !== "production";

exports.API_ROOT = IS_DEV
  ? "http://localhost:8000/api/v1/"
  : "https://filipp-zhuravlev.ru/api/v1/";

exports.STATIC_PATH = "/";
