// global constants
const names = ["Stange, L.", "xAndré Pascholdx", "Kathi DeFiltre", "Thilo Spomoni", "Leo "];
const imageFiles = ["laura.jpg","ondi.jpg","kathi.jpg","thilo.jpg","leo.jpg"];
const texts = ["Christian toller Typ.","Gutaussehend und trinkfreudig.","Christian Schulze in 3 Worten: Macher, fähig, geiler Informatiker.", "Das kann ja wohl nicht Warzenschwein!","Chrissi, wir müssen reden."];

// ************ CLASSES **************
class Partner {
    constructor (name, imgFilePath, flavourText){
        this.name = name;
        this.imgFilePath = imgFilePath;
        this.flavourText = flavourText;
    }
}

class PartnerList {
    static #getPartnerList(){
        const partnerList = [];

        if (names.length === imageFiles.length && names.length === texts.length){
            
            for(let index = 0; index < names.length; index ++){
                let partner = new Partner(names[index], imageFiles[index],texts[index]);
                partnerList.push(partner);
            }

        } else {
            console.log("false");
        }

        return partnerList;
    }

    static getPartnerAsHtmlElement(){
        const partners = this.#getPartnerList();
        const partnersAsHtmlElement = partners.map( (partner) => {
            return `<article class="review">
                                <div class="logo-container">
                                    <img src="./images/project-partner/${partner.imgFilePath}" alt="">
                                </div>
                                <h4 class="partner-name">${partner.name}</h4>
                                <p class="partner-review">${partner.flavourText}</p>
                            </article>
                            `
        });

        return partnersAsHtmlElement.join("");
    }
}


/*
==========
LOGIC
==========
*/
// ******* ADDING ELEMENTS TO THE HTML ***************
const reviewContainer = document.querySelector(".reviews");

reviewContainer.innerHTML = PartnerList.getPartnerAsHtmlElement();

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
