import { user } from "./user.js";

const followers = document.getElementById("followers");
const following = document.getElementById("following");

const popup = document.getElementById("follows");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closePopup");

const followss = document.getElementById("isfollowersorfollowing");

function getdata(type) {
  const url = `https://api.github.com/users/${user}/${type}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const follows_con = document.createElement("div");
follows_con.classList.add("row");

function setdata(data) {
  if (data) {
    for (const dt of data) {
      const anchorElement = document.createElement("a");
      anchorElement.href = `/?user=${dt.login}`;
      anchorElement.classList.add("text-decoration-none", "mb-3");
      anchorElement.style.color = "inherit";

      const rowElement = document.createElement("div");
      rowElement.classList.add("row", "align-items-center", "mb-2");

      const flexContainer = document.createElement("div");
      flexContainer.classList.add("col-12", "d-flex");

      const imgContainer = document.createElement("div");
      imgContainer.classList.add("col-4");

      const imgElement = document.createElement("img");
      imgElement.classList.add("img-fluid", "rounded-circle");
      imgElement.src = dt.avatar_url;
      imgElement.alt = dt.login;
      imgElement.style.height = "50px";
      imgElement.style.width = "50px";

      imgContainer.appendChild(imgElement);

      const textContainer = document.createElement("div");
      textContainer.classList.add("col-8");

      const usernameElement = document.createElement("div");
      usernameElement.classList.add("col-12", "font-weight-bold");
      usernameElement.textContent = dt.login;

      const nameElement = document.createElement("div");
      nameElement.classList.add("col-12");
      nameElement.textContent = dt.type;

      textContainer.appendChild(usernameElement);
      textContainer.appendChild(nameElement);

      flexContainer.appendChild(imgContainer);
      flexContainer.appendChild(textContainer);

      rowElement.appendChild(flexContainer);
      anchorElement.appendChild(rowElement);
      follows_con.appendChild(anchorElement);
    }
    popup.appendChild(follows_con);
  }
}

followers.addEventListener("click", async function () {
  followss.innerText = "followers";
  follows_con.innerText = "";
  const data = await getdata("followers");
  setdata(data);
  popup.style.display = "block";
  overlay.style.display = "block";
});

following.addEventListener("click", async function () {
  followss.innerText = "following";
  follows_con.innerText = "";
  const data = await getdata("following");
  if (data) {
    setdata(data);
  }
  popup.style.display = "block";
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
  popup.style.display = "none";
  overlay.style.display = "none";
});
