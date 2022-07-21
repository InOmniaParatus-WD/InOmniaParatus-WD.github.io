const quoteBtn = document.getElementById("new-quote");
const quoteText = document.querySelector(".quote-text");
const text = document.getElementById("text");
const authorName = document.getElementById("author");

// const tweetBtn = document.getElementById("tweet-quote");
// const tumblrBtn = document.getElementById("tumblr-quote");
// const body = document.body;


const colors = [
	"#006466",
	"#065A60",
	"#0B525B",
	"144552",
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
	"#723d46"
];

quoteBtn.addEventListener("click", randomQuote);
randomQuote();

function randomQuote() {
	let randomColor = colors[Math.floor(Math.random() * colors.length)];

	quoteText.classList.add("slide");

	fetch("https://api.quotable.io/random")
		.then((response) => response.json())
		.then((result) => {
			text.innerText = result.content;
			authorName.innerText = result.author;

		document.documentElement.style.setProperty("--elem-color", randomColor);
			// quoteText.style.color = randomColor;
			// body.style.background = randomColor;
			// quoteBtn.style.background = randomColor;
			// tweetBtn.style.background = randomColor;
			// tumblrBtn.style.background = randomColor;

			setTimeout(() => {
				quoteText.classList.remove("slide");
			}, 500);
		});
}
