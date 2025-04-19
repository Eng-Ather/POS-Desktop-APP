const signInBtn = document.getElementById("signinBtn");
const signinform = document.getElementById("signInForm")
const mail = document.querySelector("#email");
const pass = document.querySelector("#password");

// signInBtn.addEventListener("click", function (){
//   console.log("THis function is working")
//   console.log("email==>", mail.value)
//   console.log("password==>", pass.value)
//   window.location.href = "./screens/salesmanDashboard/index.html"
// });

signinform.addEventListener("submit", (e) => {
  e.preventDefault()
    alert("Kaam Kar raha he!")


    window.location.href = "./screens/salesmanDashboard/index.html"
})
