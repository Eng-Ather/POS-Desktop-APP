const signinform = document.getElementById("signInForm");

signinform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  // to emit data to offline database
  window.electronAPI.signinUser(data);
});

// to receive called APIs response
window.electronAPI.receiveSigninResponse((res) => {
  if (res.success && res.data.role == "admin") {
    console.log(res);
    window.location.href = "./screens/dashboard/adminDashboard/index.html";
  }
});

