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

// alert(window.innerWidth)
function scrollR(){
    document.getElementById('Projects').scrollLeft += window.innerWidth;
}
function scrollL(){
    document.getElementById('Projects').scrollLeft -= window.innerWidth;
}