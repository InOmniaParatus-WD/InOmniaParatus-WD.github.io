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
  });

  console.log(currCount, projectsDetails.length);
  if (projectsDetails.length === currCount) {
    showMoreBtn.style.display ="none"
    projectsCollection.style.paddingBottom = "2rem"
  }
}

showMoreBtn.addEventListener("click", () => addToDom(3));
