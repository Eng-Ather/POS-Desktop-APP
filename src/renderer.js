const signinform = document.getElementById("signInForm");
const Uname = document.querySelector("#name");
const mail = document.querySelector("#email");
const pass = document.querySelector("#password");

signinform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: Uname.value,
    email: mail.value,
    password: pass.value,
  };

  window.electronAPI.signUpUser(data);
});

window.electronAPI.receiveSignupResponse((res) => {
  if (res.success && res.success == true) {
    window.location.href = "./screens/salesmanDashboard/index.html";
  }
});

// try {
//   const response = await fetch("http://localhost:27017/user/signin", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await response.json();
//   console.log(data);

//   console.log(data)
//   alert("Login Successfull")
// } catch (err) {
//   alert("Login failed!");
// }

// window.location.href = "./screens/salesmanDashboard/index.html";
