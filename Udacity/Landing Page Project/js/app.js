/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// variable that will store the navbar element in
const navbar = document.getElementById('navbar__list');
// variable that will get all navbar elements
const navbarElement = document.getElementsByClassName('menu-link');
// variable that will get all sections in the webpage
const section = document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navbarCreator = () => {
    // empty variable to store the elements in
    let elements = '';
    // foreach loop to loop through all sections
    section.forEach(sec => {
        // get both section id and data-nav and store them
        const sectionID = sec.id;
        const sectionDataNav = sec.dataset.nav;
        // create the template literals 
        const elements = `<li><a class='menu__link' href='#${sectionID}'>${sectionDataNav}</a></li>`;
        // finally append everything to navbar list
        navbar.insertAdjacentHTML('beforeend', elements);
    });  
};

// Add class 'active' to section when near top of viewport
// when scroll of a section (not active) remove the "your-active-class" to that section
const removeActive = (sect) => {
    sect.classList.remove('your-active-class');
    //sect.classList.remove('menu-link');
    sect.style.cssText = 'background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%);';
};
// when scroll through a section (active) add the "your-active-class" to that section
const addActive = (condition, sect) => {
    if (condition) {
        sect.classList.add('your-active-class');
        // sect.classList.add('menu-link');
        sect.style.cssText = 'background: linear-gradient(to bottom right, CadetBlue, SteelBlue); border-radius: 50px;';
        
    }
};

// function calculates and returns the vertical distance between the top of a section element and the top of the viewport
const distance = sect => Math.floor(sect.getBoundingClientRect().top);

// function to call both addActive and RemoveActive functions
const activation = () => {
    section.forEach(sect => {
        const position = distance(sect);

        viewport = () => position < 150 && position >= -150;
        removeActive(sect);
        addActive(viewport(), sect);
    });
};


// Scroll to anchor ID using scrollTO event
const scrollToTop = document.getElementById('scroll');
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 100,
        behavior: "smooth",
      });
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navbarCreator();

// Scroll to section on link click


// Set sections as active
window.addEventListener('scroll', activation);

// highlighted header when scrollling 
document.addEventListener('scroll', () => {
    const header = document.querySelectorAll('menu__link');
    // if statement to check whether the page is scrolled or not
    if (window.scrollY > 0) {
        header.classList.add('scrolling');
    } else {
        header.classList.remove('scrolling');
    }
});