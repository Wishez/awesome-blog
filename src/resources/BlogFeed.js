export default {
  feed() {
    return {
      path: '/static/feed.json',
      resolve: (response, mappers) => mappers.pipe(response.results)
    }
  }
}
