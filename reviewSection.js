// global constants
const partnersAsList = [{
        name: "Stange, L.",
        imageFile : "laura.jpg",
        flavourText : "Christian toller Typ."
    },
    {
        name: "xAndré Pascholdx",
        imageFile : "ondi.jpg",
        flavourText : "Gutaussehend und trinkfreudig."
    },
    {
        name: "Kathi DeFiltre",
        imageFile : "kathi.jpg",
        flavourText : "Christian Schulze in 3 Worten: Macher, fähig, geiler Informatiker." 
    },
    {
        name: "Thilo aka Lolo Spomoni",
        imageFile : "lolo.jpg",
        flavourText : "Das kann ja wohl nicht Warzenschwein!"
    },
    {
        name: "Leo",
        imageFile : "leo.jpg",
        flavourText : "Chrissi, wir müssen reden."
    }
]

/*
==========
LOGIC
==========
*/

function getPartnerAsHtmlElement() {
    const partnersAsHtmlElement = partnersAsList.map( (partner) => {
        return `<article class="review">
                    <div class="logo-container">
                        <img src="./images/project-partner/${partner.imageFile}" alt="">
                    </div>
                    <h4 class="partner-name">${partner.name}</h4>
                    <p class="partner-review">${partner.flavourText}</p>
                </article>
                `      
        });

        return partnersAsHtmlElement.join("");
}

// ******* ADDING ELEMENTS TO THE HTML ***************
const reviewContainer = document.querySelector(".reviews");

reviewContainer.innerHTML = getPartnerAsHtmlElement();

const reviewSlides = reviewContainer.querySelectorAll(".review");

reviewSlides.forEach( (reviewSlide, index) => {
    reviewSlide.style.left = `${index * 100}%`;
});

// ************ ADD INTERACTIONS ***********
const backward_btn = document.getElementById("rev-backward");
const forward_btn = document.getElementById("rev-forward");

let indexCounter = 0;

backward_btn.addEventListener("click", function(){
    indexCounter --;

    slideReviews();
});

forward_btn.addEventListener("click", function(){
    indexCounter ++;

    slideReviews();
});

function slideReviews(){
    if (indexCounter === reviewSlides.length){
        indexCounter = 0;
    } else if (indexCounter < 0){
        indexCounter = reviewSlides.length -1;
    }
    reviewSlides.forEach( (reviewSlide) => 
        reviewSlide.style.transform = `translateX(-${indexCounter*100}%)`
)}
