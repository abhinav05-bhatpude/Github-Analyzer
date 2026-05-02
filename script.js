const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
  const username = usernameInput.value;

  if(!username){
    result.innerText="Please enter a username ❌";
    return
  }

  result.innerHTML="<p>Loading user data...</p>"

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos=await repoRes.json()

  

  result.innerHTML=`
  <img src="${data.avatar_url}" width="90">
  <h3>${data.name || data.login}</h3>
  <p>${data.bio || "No bio available"}</p>
  <p>Followers : ${data.followers}</p>
  <p>Following: ${data.following}</p>
  <p>Public Repos : ${data.public_repos}</p>
  <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
  `;
});