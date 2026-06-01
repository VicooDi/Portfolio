var tabs_moved = 0
var win_w = window.innerWidth;
var win_h = window.innerHeight;

function startup(){
    document.body.innerWidth = win_w;
    document.body.innerHeight = win_h;
    var tabs_moved = 0;
    annoying = false;
    var annoying2 = false;
    return 0;
}

var tabsUpTrue = false;
function tabsUp() {
    if (tabsUpTrue)
        return 1;
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
    tabsUpTrue = true;
    tabsDownTrue = false;
    return 1;
}

var annoying = false;
var annoying2 = false;
var tabsDownTrue = false;
function tabsDown() {
    if (tabsDownTrue)
        return 1;

    var sections = document.getElementsByClassName("sections");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.animation="tabs_down 0.2s ease";
        sections[i].style.animationFillMode="forwards";
    }

    tabs_moved += 1;
    
    if (tabs_moved >10  && !annoying) {
        alert("This is not a bug, I like being annoying.")
        annoying = true
    }
    if (tabs_moved >20  && !annoying2) {
        alert("matter of fact, I went out of my way to make this work")
        annoying2 = true
    }

    tabsUpTrue = false;
    tabsDownTrue = true;
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
    // document.getElementById("emailTooltip").innerHTML = "Copy Email"
}