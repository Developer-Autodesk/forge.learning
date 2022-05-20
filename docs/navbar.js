
function Nav() {
    var btn = document.getElementById("navbtn");
    btn.onclick = openCloseNav;
}

function openCloseNav() {
    var dropdownNav = document.getElementById("collapsible-nav");
    if (dropdownNav.style.display === "none") {
        dropdownNav.style.display = "flex";
        dropdownNav.style.flexDirection = "column";
        dropdownNav.style.left = "-100px";
        dropdownNav.style.alignItems = "flex-start";
        dropdownNav.style.marginTop = "20px";
    } else {
        dropdownNav.style.display = "none";
    }
}
