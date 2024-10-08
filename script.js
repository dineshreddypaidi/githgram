import { user } from "./user.js";

const usernameElem = document.getElementById("username");
const profile_img = document.getElementById("profile-img");

const repo_count = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const bio = document.getElementById("bio");
const fullname = document.getElementById("fullname");

let total_repos;
function getdata(githubUsername) {
  const url = `https://api.github.com/users/${githubUsername}`;
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

export async function getuserdata() {
  let total_repos;
  const data = await getdata(user);
  if (data) {
    profile_img.src = data.avatar_url;
    usernameElem.innerText = data.login;
    repo_count.innerText = `${data.public_repos} repos`;
    total_repos = data.public_repos;
    followers.innerText = `${data.followers} followers`;
    following.innerText = `${data.following} following`;
    bio.innerText = data.bio;
    fullname.innerText = data.name;
  }
  return total_repos;
}