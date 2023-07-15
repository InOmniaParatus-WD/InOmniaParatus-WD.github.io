const projects = document.querySelectorAll(".project-tile");
const projectsContainer = document.querySelector("#projects-cards");
const loading = document.querySelector(".loader");

console.log(projects, projects.length);

// Show loader and fetch more projects
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
    showProjects();
    setTimeout(() => {}, 300);
  }, 1000);
}

function showProjects() {
  let projects = Array.from(projectsContainer.children);
  console.log(projects);
}
showProjects();
