const projectsCollection = document.querySelector("#project-tiles");
const projects = document.querySelectorAll(".project-tile");
const showMoreBtn = document.querySelector("#show-more-projects");

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
      <img src="${project.photo}" alt="${project.altText}">
      </a>
    `;

    projectsCollection.appendChild(projectTile);

    currCount++;
    if (projectsDetails.length === currCount) console.log("ok");
  });

  if (projectsDetails.length === currCount) {
    showMoreBtn.innerHTML = "Show less...";
    // projectsCollection.style.paddingBottom = "2rem";
  }
}

showMoreBtn.addEventListener("click", () => {
  if (projectsDetails.length > currCount) {
    console.log("ADDING");
    addToDom(3);
  } else if (projectsDetails.length === currCount) {
    let tiles = Array.from(projectsCollection.childNodes);

    for (let i = tiles.length - 1; i > 5; i--) {
      console.log(i)
    }

    // forEach((tile, i) => {
    //   if (i > 5) {
    //     console.log(tile, i);
    //     projectsCollection.removeChild(tile);
    //     // tile.remove()
    //     currCount--;
    //   }
    // });
  }
});
