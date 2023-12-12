const projectsCollection = document.querySelector("#project-tiles");
const projects = document.querySelectorAll(".project-tile");
const showProjectsBtn = document.querySelector("#show-more-projects");

let projectsDetails;
let currCount = 0;

fetch("projects.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    projectsDetails = data;
    addToDom(6);
  });

function addToDom(count) {
  projectsDetails.slice(currCount, currCount + count).forEach((project) => {
    const projectTile = document.createElement("div");

    projectTile.classList.add("project-tile");

    projectTile.innerHTML = `
      <a href="${project.projectLink}" target="_blank">
        <div class="overlay">VIEW PROJECT</div>  
        <img src="${project.photo}" alt="${project.altText}">
      </a> 
    `;

    projectsCollection.appendChild(projectTile);

    currCount++;
  });

  if (projectsDetails.length === currCount) {
    showProjectsBtn.innerHTML = "Show less...";
  }
}

showProjectsBtn.addEventListener("click", () => {
  if (projectsDetails.length > currCount) {
    addToDom(3);
  } else if (projectsDetails.length === currCount) {
    let tiles = Array.from(projectsCollection.childNodes);

    for (let i = tiles.length - 1; i > 5; i--) {
      currCount--;
      projectsCollection.removeChild(tiles[i]);
      showProjectsBtn.innerHTML = "More projects...";
    }
  }
});
