export function listenExternalLinks() {
  const links = document.querySelector(".not-follow");
  console.log(links);
  if (links) {
    links.addEventListener("click", e => {
      const url = e.target.getAttribute("href");

      window.open(url);
      e.preventDefault();
    });
  }
}
