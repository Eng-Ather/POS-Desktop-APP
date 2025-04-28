const chkoutBtn = document.getElementById("checkout-btn");
const logoutBtn = document.getElementById("logoutBtn");

chkoutBtn.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

logoutBtn.addEventListener("click", () => {
  // window.location.href = "../../index.html";

  window.electronAPI.signoutUser();
});

// to receive called APIs response
window.electronAPI.receiveSignoutResponse((res) => {
  console.log(res);
  window.location.href = "../../index.html";
});
