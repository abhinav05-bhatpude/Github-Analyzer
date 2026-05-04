const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    result.innerText = "Please enter a username ❌";
    return;
  }

  searchBtn.disabled = true;
  searchBtn.innerText = "Loading...";
  result.innerHTML = "<p>Fetching user data...</p>";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await repoRes.json();

    result.innerHTML = `
      <div class="card">
        <img src="${data.avatar_url}" class="avatar">
        <h3>${data.name || data.login}</h3>
        <p>${data.bio || "No bio available"}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
      </div>
    `;

    if (repos.length === 0) {
      result.innerHTML += "<p>No repositories found</p>";
    } else {
      const topRepos = repos.slice(0, 3).map(repo => `<li>${repo.name}</li>`).join("");
      result.innerHTML += `
        <h4>Top Repositories:</h4>
        <ul>${topRepos}</ul>
      `;
    }

  } catch (err) {
    result.innerHTML = "<p style='color:red;'>User not found ❌</p>";
  } finally {
    searchBtn.disabled = false;
    searchBtn.innerText = "Search";
  }
});