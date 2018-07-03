export function listenExternalLinks() {
  const links = document.getElementsByClassName("not-follow");

  if (links) {
    Array.from(links).forEach(link => {
      link.addEventListener("click", e => {
        const url = e.target.getAttribute("href");

        window.open(url);
        e.preventDefault();
      });
    });
  }
}
