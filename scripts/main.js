var tabs_moved = 0

function tabsUp() {
    var tabs = document.getElementById("tabs");
    var sections = document.getElementsByClassName("sections");
    if(tabs.matches(":hover")){
        return 0
    }
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.animation="tabs_up 0.2s ease";
        sections[i].style.animationFillMode="forwards";
    }
    //tabs.style.animation="tabs_up 0.2s ease";
    //tabs.style.animationFillMode="forwards";
    return 1;
}
function tabsDown() {
    var sections = document.getElementsByClassName("sections");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.animation="tabs_down 0.2s ease";
        sections[i].style.animationFillMode="forwards";
    }
    tabs_moved+=1;
    return 1;
}

function alignSocial() {
    var socials = document.getElementById("Socials");
    
    var project_h = document.getElementById("Projects").style.height;
    var pfp_h = document.getElementById("pfp").style.height;

    alert(String(project_h));
    alert(String(pfp_h));
    
    socials.style.height = project_h - pfp_h - (project_h - (project_h * 0.5));

    alert(String(socials.style.height));
}

// alert(window.innerWidth)
function scrollR(){
    document.getElementById('Projects').scrollLeft += window.innerWidth/2;
}
function scrollL(){
    document.getElementById('Projects').scrollLeft -= window.innerWidth/2;
}

function copyEmailToClipBoard() {

    // Copy the text inside the text field
    navigator.clipboard.writeText("vicoodigm@gmail.com");
    document.getElementById("emailTooltip").innerHTML = "Copied!"

}

function resetToolTip() {
    document.getElementById("emailTooltip").innerHTML = "Copy Email"
}