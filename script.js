function checkAdminCode() {
    const code = document.getElementById("adminCode").value;
    if (code === "minxex") {
        document.getElementById("console").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Incorrect admin code!");
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("console").style.display = "block";
    document.getElementById("adminCode").value = ""; // Clear the input
}