import { ipcRenderer } from "electron";

const signInBtn = document.getElementById("signinBtn");
const signinform = document.getElementById("signInForm");
const mail = document.querySelector("#email");
const pass = document.querySelector("#password");

signinform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = mail.value;
  const password = pass.value;

  try {
    const response = await fetch("http://localhost:5000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Login successful!");
    } else {
      alert(data.message, "else");
    }
  } catch (err) {
    alert("Login failed!");
  }

  // alert("Kaam Kar raha he!");

  // window.location.href = "./screens/salesmanDashboard/index.html";
});
