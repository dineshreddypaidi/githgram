import { user } from "./user.js";
import { getuserdata } from "./script.js";

const reposele = document.getElementById("repos");

async function repos(user) {
  const total_repos = await getuserdata();
  const url = `https://api.github.com/users/${user}/repos?per_page=${total_repos}&sort=updated&direction=desc`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

const repos_con = document.createElement("div");
repos_con.classList.add("row");

repos(user).then((data) => {
  if (data) {
    console.log(data.length);
    for (const dt of data) {
      const repoElement = document.createElement("div");
      repoElement.classList.add("col-4", "mb-3", "repos");

      const imgElement = document.createElement("img");
      imgElement.src = `https://dummyimage.com/150x150/252525/f4f4f4.png&text=${dt.name}`; //`https://via.placeholder.com/180x180.png?text=${dt.name}`;
      imgElement.classList.add("img-fluid");
      imgElement.alt = dt.full_name;

      repoElement.appendChild(imgElement);
      repos_con.appendChild(repoElement);
    }
    reposele.appendChild(repos_con);
  }
});
