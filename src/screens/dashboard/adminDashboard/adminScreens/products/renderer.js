const goBackButton = document.getElementById("goBackButton")


goBackButton.addEventListener("click", () => {
    // webContents.goBack()
    window.location.href = "../../index.html"
})