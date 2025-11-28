// ************** DARK MODE ****************

window.addEventListener("DOMContentLoaded", checkDayTime);
setInterval(checkDayTime, 1000);

function checkDayTime(){
    const dayTime = new Date().getHours()

    if (6 <= dayTime  && dayTime < 18){
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    }    
}

// ************** TOGGLE NAV BAR ***********
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".nav-links");

navToggle.addEventListener("click", function () {
    // toggle show-links is not preferred as it uses hard-coded values
    //linksContainer.classList.toggle("show-links");
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    console.log(linksHeight);

    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
})

// ************** FIXED NAV BAR ************
const navBar = document.getElementById("nav-bar");
const typingElement_span = document.getElementById("typed");

window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;

    const navBarHeight = navBar.getBoundingClientRect().height;

    if (scrollHeight > navBarHeight){
        navBar.classList.add("fixed-nav");
    } else {
        navBar.classList.remove("fixed-nav");
    }
})

// ************** SMOOTH SCROLL *************
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
    link.addEventListener("click", function(e){
        e.preventDefault();

        //navigate to specific spot
        const id = e.currentTarget.getAttribute("href").slice(1);
        const targetSection = document.getElementById(id);
        //calculate the heights

        const containerHeight = linksContainer.getBoundingClientRect().height;
        const isFixedNav = navBar.classList.contains("fixed-nav");
        const navBarHeight = navBar.getBoundingClientRect().height;

        let position = targetSection.offsetTop - (navBarHeight);

        if(!isFixedNav){
            position = position - navBarHeight;
        }
        if(navBarHeight > 112){
            position = position + containerHeight;
        }
        
        window.scrollTo({left:0, top:position});

        linksContainer.style.height = 0;
    });
});

/*
===============
GIMMICS
===============
*/

// ****************** HTML SCROLL IMG ****************
const scroll_img = document.getElementById("html-scroll-img");
const scrollImg_div = document.getElementById("scroll-img-div");

const scrollImgPositionTop = scrollImg_div.getBoundingClientRect().top;
const scrollPositionBottom = scrollImg_div.getBoundingClientRect().bottom;
const navBarHeight = navBar.getBoundingClientRect().height;

window.addEventListener("scroll", function () {  
  const viewBottomBorder = window.pageYOffset + window.innerHeight + navBarHeight;
  const viewTopBorder = window.pageYOffset + navBarHeight * 2;

  if (viewBottomBorder >= scrollPositionBottom && viewTopBorder < scrollImgPositionTop){
    const translateYByPixel = viewBottomBorder - scrollPositionBottom;

    scroll_img.style.transform=(`translateY(-${translateYByPixel}px)`);
  }
})

// ***************** INTERACTION BUTTON ******************
const discount_btn = document.getElementById("discount-btn");
const discountPopUp = document.querySelector(".discount");

discount_btn.addEventListener("click", ()=>{
    if (discountPopUp.classList.toggle("show-discount")){
        discount_btn.innerHTML = "click me again!";
    } else {
        discount_btn.innerHTML = "click me!";
    }
});