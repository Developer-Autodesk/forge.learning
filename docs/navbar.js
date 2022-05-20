const mediaQuery = window.matchMedia('(min-width: 768px)');

function Nav() {
    var btn = document.getElementById("navbtn");
    btn.onclick = openCloseNav;
}

function openCloseNav() {
    var dropdownNav = document.getElementById("nav-center");
    if (dropdownNav.style.display === "none") {
        dropdownNav.style.display = "flex";
        dropdownNav.style.flexDirection = "column";
        dropdownNav.style.left = "-200px";
        dropdownNav.style.alignItems = "flex-start";
        dropdownNav.style.marginTop = "20px";
        // Register event listener
        mediaQuery.addListener(handleTabletChange)
        // Initial check
        handleTabletChange(mediaQuery)
    } else {
        dropdownNav.style.display = "none";
    }
}

function handleTabletChange(e) {
    if (e.matches) {
        var dropdownNav = document.getElementById("nav-center");
        dropdownNav.style.display = "flex";
        dropdownNav.style.flexDirection = "row";
        dropdownNav.style.alignItems = "center";
        dropdownNav.style.justifyContent = "space-between";
        dropdownNav.style.flex = "0.6";
        dropdownNav.style.marginTop = "-8px";
    }else{
        var dropdownNav = document.getElementById("nav-center");
        dropdownNav.style.display = "flex";
        dropdownNav.style.flexDirection = "column";
        dropdownNav.style.left = "-200px";
        dropdownNav.style.alignItems = "flex-start";
        dropdownNav.style.marginTop = "-8px";
    }
}


