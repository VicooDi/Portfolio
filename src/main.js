// import { TEST_VALUE } from "./lib/utilities"; //automatically iumports the index.js in that folder
// alert(TEST_VALUE);

var tabs_moved = 0;

//detect the loading of the bare bones page then excute certain timely instructions
document.addEventListener('DOMContentLoaded', () => { //waits for the DOM to load before running the script, prevents null errors
    //adding event listener to inititialize necessary js for certain section.
    const me = document.getElementById('me');
    
    if (me != null) {
        loadJS('/src/lib/3d_manager/logo.js', document.head);
    }
    
    //adding event listener to necessary html elements, and linking them to their respective functions in the script
        //html sections
    const header = document.querySelector('header');
    const email_tooltip = document.getElementsByClassName("tooltip");
    const scrollerL = document.getElementById('HScrollL');
    const scrollerR = document.getElementById('HScrollR');

        //respective actions
    if (header != null) {
        header.addEventListener('mouseover', tabsUp);
        header.addEventListener('mouseout', tabsDown);
    }
    if (email_tooltip != null) {
        for (let i = 0; i < email_tooltip.length; i++) {
            email_tooltip[i].addEventListener('click', copyEmailToClipBoard);
            email_tooltip[i].addEventListener('mouseout', resetToolTip);
        }
    }
    if(scrollL != null) {
        scrollerL.addEventListener('click', scrollL);
        scrollerR.addEventListener('click', scrollR);
    }
});


//the respective functions in question
function tabsUp() {
    var tabs = document.getElementById("tabs");
    var sections = document.getElementsByClassName("sections");
    if(tabs.matches(":hover")){
        return 0;
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

function alignSocial() { //I have no clue what this does.
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
    document.getElementById("emailTooltip").innerHTML = "Copied!";

}

function resetToolTip() {
    document.getElementById("emailTooltip").innerHTML = "Copy Email";
}


/** loads a JS file from `path` to `target`*/
function loadJS(path, target) {
    let script = document.createElement("script");
    script.onload = () => {
        //do stuff with the script
    };
    script.type = "module";
    script.src = path;
    //EX : target = document.head
    target.appendChild(script);
}