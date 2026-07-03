const navLinks = document.querySelectorAll(".navbar a");
const buttons = document.querySelectorAll("button");
const navInput = document.querySelector("header input")
const smallNav = document.querySelector(".small_navbar")
const asideNav = document.querySelector(".aside_navbar")
const asideNavExit = document.querySelector(".aside_nav_exit")
const footer = document.querySelector("footer")
const elements = {
  mainPageHero: document.querySelector(".hero"),
  recipesHead: document.querySelector(".recipes_header"),
  mainRecipes: document.querySelector(".recipes"),
  aboutUsHero: document.querySelector(".about_us_hero"),
  recipesHero: document.querySelector(".recipes_hero"),
  pancakePageMain: document.querySelector(".page_pancake_main"),
  pancakeRecipeText: document.querySelector(".text_pancake"),
  chocolatePageMain: document.querySelector(".page_chocolate_main"),
  chocolateRecipeText: document.querySelector(".text_chocolate"),
  wafflePageMain: document.querySelector(".page_waffle_main"),
  waffleRecipeText: document.querySelector(".text_waffle"),
};
const pageStates = {
  1: ["mainPageHero", "recipesHead", "mainRecipes"],
  2: ["mainPageHero", "recipesHead", "mainRecipes", "recipesHero"],
  3: ["mainPageHero", "aboutUsHero"],
  4: ["waffleRecipeText", "wafflePageMain"],
  5: ["pancakeRecipeText", "pancakePageMain"],
  6: ["chocolateRecipeText", "chocolatePageMain"],

};
function updatePageStructure(pageNumber) {
  const activeElements = pageStates[pageNumber] || [];

  Object.keys(elements).forEach((key) => {
    if (!elements[key]) return;

    const shouldDeactivate = !activeElements.includes(key);
    elements[key].classList.toggle("deactivate", shouldDeactivate);
  });
}
function scrollToElement(element, offset = 0) {
  if (!element) return;
  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}


navLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageNumber = index + 1;
    updatePageStructure(pageNumber);

    if (pageNumber === 2) {
      scrollToElement(elements.recipesHero?.firstElementChild);
    } else if (pageNumber === 3) {
      scrollToElement(elements.aboutUsHero, 200);
    }
  });
});

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const pageNumber = index + 4;
    updatePageStructure(pageNumber);
    if (pageNumber === 4){
      scrollToElement(elements.wafflePageMain)
    } else if (pageNumber === 5) {
      scrollToElement(elements.pancakePageMain)
    } else if (pageNumber === 6) {
      scrollToElement(elements.chocolatePageMain)
    }
  });
});

function windowSizeCheck() {
  if (window.innerWidth < 850){
  navLinks.forEach(element => {
    element.classList.add("deactivate")
  });
  navInput.classList.add("deactivate")
  smallNav.classList.remove("deactivate")
  elements.mainRecipes.style.cssText = `
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
  `
  footer.style.top = `${window.innerHeight + 300}px`

  if(window.innerHeight < 400){
  footer.style.top = `${window.innerHeight}px`
  footer.firstChild.classList.add("deactivate")
  }

} else {
  navLinks.forEach(element => {
    element.classList.remove("deactivate")
  });
  navInput.classList.remove("deactivate")
  smallNav.classList.add("deactivate")
    elements.mainRecipes.style.cssText = `
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  `
    footer.style.top = `0px` 
}
}
windowSizeCheck()


let countForThing = 0;
window.addEventListener('resize', windowSizeCheck)
smallNav.addEventListener('click', () => {
  countForThing++;
  if(countForThing % 2 === 1){
    asideNav.classList.remove("deactivate")
  } else {
    asideNav.classList.add("deactivate")
  }
})


asideNavExit.addEventListener('click', () => {
  countForThing++;
  if(countForThing % 2 === 0){
    asideNav.classList.add("deactivate")
  } else {
    asideNav.classList.remove("deactivate")
  }
  console.log()
})