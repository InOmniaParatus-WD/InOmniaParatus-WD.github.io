const rotation = document.getElementById("rotate");

rotation.addEventListener('mouseover', () => { rotation.style.animation = "3s linear 0.5s spin infinite"});

rotation.addEventListener("mouseleave", () => setTimeout(() => { 
    rotation.style.animationIterationCount = "1"
    rotation.style.animationTimingFunction = "steps(360, jump-none)"
   }, 1000));