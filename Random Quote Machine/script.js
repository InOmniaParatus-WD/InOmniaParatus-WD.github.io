const colors = [
  "#006466",
  "#065A60",
  "#0B525B",
  "#144552",
  "#1b3a4b",
  "#212f45",
  "#272640",
  "#312244",
  "#72b01d",
  "#3f7d20",
  "#ca6702",
  "#3e1f47",
  "#4d194d",
  "#2ec4b6",
  "#007f5f",
  "#02c39a",
  "#fb8500",
  "#e63946",
  "#723d46",
];


// ---------- jQuery Code ---------- //

const quoteBtn = $("#new-quote");
const quoteContainer = $(".quote-text");
const quoteText = $("#text");
const author = $("#author");

$(document).ready(function () {
  $(quoteBtn).click(function (e) {
    
    $(quoteContainer).fadeOut()

    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    $.ajax({
      url: "https://api.quotable.io/random",
      dataType: "json",
      success: function (data) {
        $(quoteText).text(data.content);
        $(author).text(data.author);
      },
    })
      .fail((err) => {
        $(quoteText).text(
          "Oops! Something went wrong <span>&#128533;</span> ..."
        );
        $(author).text("Please try again");
      })
      .always(() => {
       $(quoteContainer).fadeIn("slow")
        document.documentElement.style.setProperty("--elem-color", randomColor);
      });
  });
});

// ---------- Vanilla Code ---------- //

// const quoteBtn = document.getElementById("new-quote");
// const quoteText = document.querySelector(".quote-text");
// const text = document.getElementById("text");
// const author = document.getElementById("author");


// quoteBtn.addEventListener("click", randomQuote);
// randomQuote();

// function randomQuote() {
//   let randomColor = colors[Math.floor(Math.random() * colors.length)];

//   quoteText.classList.add("slide");

//   fetch("https://api.quotable.io/random")
//     .then((response) => response.json())
//     .then((result) => {
//       text.innerText = result.content;
//       author.innerText = result.author;
//     })
//     .catch((err) => {
//       text.innerHTML= "Oops! Something went wrong <span>&#128533;<span> ...";
//       author.innerText = "Please try again";
//     })
//     .finally(() => {
//       document.documentElement.style.setProperty("--elem-color", randomColor);
//       setTimeout(() => {
//         quoteText.classList.remove("slide");
//       }, 100);
//     });
// }
