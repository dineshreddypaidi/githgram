const currentUrl = window.location.href;
const parsedUrl = new URL(currentUrl);

const searchParams = new URLSearchParams(parsedUrl.search);
let user;

if (searchParams.has("user")) {
  user = searchParams.get("user");
} else {
  user = "dineshreddypaidi";
}

console.log(user);
export { user };
