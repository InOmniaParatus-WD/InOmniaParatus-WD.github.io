// STEP 4: Bring in all the square and the image

// The image is not a feature required by the challange :)
const squares = document.querySelectorAll(".square");
const image = document.querySelector("img");

// STEP 5: Keep track of the clicked squares
// Initialize an array which will "house" all the clicked squares
let clickedSquares = [];

let startImg = `<img src="owl.png">`;
// Add events to the squares
squares.forEach((btn) => {
  btn.innerHTML = startImg;
  btn.addEventListener("click", (e) => {
    updateArray(e.target);
    // When the last button is clicked start changing colors backwards
    if (clickedSquares.lastIndexOf(e.target) === squares.length - 1) changeColor();
  });
});

// STEP 6: Define the functions that will update the state of the square

// ----------- Change background and add buttons clicked to the array
function updateArray(clicked) {

  // Add the class green when clicked
  clicked.classList.add("green");

  // Disable squares once they are clicked to avoid multiple clicks
  // If the quares are clicked once the colour reverse function gets triggered it will cause issues
  clicked.style.pointerEvents = "none";

  // Check if the button is already in the array if not push index
  for (let i = 0; i < squares.length; i++) {
    // Temporarly replace the image with a number. I will restore it later on.
    clicked.innerHTML = clickedSquares.indexOf(clicked) + 1;

    // If the button is not there...
    if (!clickedSquares.includes(clicked)) {
      //...add it to the array
      clickedSquares.push(clicked);
    }
  }
}

// ---------- When the sixth button is clicked, the background color will change back to initial colour, in reverse order to which the squares where clicked
function changeColor() {
  for (let i = 5; i >= 0; i--) {
    // Change the square's color and background in reverse order
    setTimeout(() => {
      // Bring the image back
      clickedSquares[i].innerHTML = startImg;
      // Remove the "green" class
      clickedSquares[i].classList.remove("green");
      // Empty the array of clicked squares so that the game can be played again
      clickedSquares.pop();
    }, (6 - i) * 1000);
    // Re-enable the squares to be clickable again
    setTimeout(() => (squares[i].style.pointerEvents = "initial"), 6000);
  }
}
