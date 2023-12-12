const firstImg = document.querySelector("#first-image");
const switchImg = document.querySelector("#switch-image");
const bone = document.querySelector("#bone-with-bow");
const originalThought = document.querySelector("#p1");
const newThought = document.querySelector("#p2")


function changeThought(event) {
  if (event.type === "mouseenter") {
    switchImg.style.opacity = "100%";
    newThought.style.display = "inline";
    originalThought.style.display = "none";
    
  } else if (event.type === "mouseleave") {
    switchImg.style.opacity = "0";
    newThought.style.display = "none";
    originalThought.style.display = "inline";
  }
}

bone.addEventListener("mouseenter", changeThought);
bone.addEventListener("mouseleave", changeThought);
