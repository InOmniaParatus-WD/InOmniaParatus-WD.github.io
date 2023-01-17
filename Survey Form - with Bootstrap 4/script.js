const stars = document.querySelectorAll(".star");

let rating = Array.from(stars);

rating.map((star, i) =>
  star.addEventListener("click", (e) => {
    rating.map((a, index) => {
      if (index >= i) {
        if (!a.classList.contains("active")) {
          a.classList.add("active");
          a.innerHTML = "&#x2605;";
        }
      } else {
        a.classList.remove("active");
        a.innerHTML = "&#x2606;";
      }
    });
  })
);
