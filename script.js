const usernameInput=document.getElementById("username");
const searchBtn=document.getElementById("searchBtn");
const result=document.getElementById("result");

searchBtn.addEventListener("click",async()=>{
    const username=usernameInput.Value;
    
    const res=await fetch(`https://api.github.com/users/${username}`);
    const data=await res.json();

    console.log(data);
})