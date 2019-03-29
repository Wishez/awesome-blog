const IS_DEV = process.env.NODE_ENV === "development";

exports.API_ROOT = IS_DEV
  ? "localhost:8000/api/v1/"
  : "https://filipp-zhuravlev.ru/api/v1/";

exports.STATIC_PATH = "/";
