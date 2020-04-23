/* Image Slider */
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
const auto = true; // Auto scroll
const intervalTime = 4000;
let slideInterval;

const register_button = document.querySelector('#register-button');

register_button.addEventListener('click', (e) => {
    console.log(auth.currentUser.uid);
    console.log(sessionStorage.getItem('event_clicked'));
    registerStudentInEvent();
});

function registerStudentInEvent() {
    if(auth.currentUser.uid == null) {
        window.alert('No legitimate user found');
        return;
    }
    db.collection("events").doc(sessionStorage.getItem('event_clicked'))
        .collection('registerations').doc(auth.currentUser.uid).set({
            novaue: 0
        }).then(function() {
            console.log('REGISTERED');
        }).catch(function(error) {
            if(auth.currentUser.uid == null) {
                window.alert('No legitimate user found');
            }
            console.log('ERROR' + error.message);
        });
}

// Select tab content item
function selectItem(e) {
    // Remove all show and border classes
    removeBorder();
    removeShow();
    // Add border to current tab item
    this.classList.add('tab-border');
    // Grab content item from DOM
    const tabContentItem = document.querySelector(`#${this.id}-content`);
    // Add show class
    tabContentItem.classList.add('show');
}

// Remove bottom borders from all tab items
function removeBorder() {
    tabItems.forEach(item => {
        item.classList.remove('tab-border');
    });
}

// Remove show class from all content items
function removeShow() {
    tabContentItems.forEach(item => {
        item.classList.remove('show');
    });
}

// Listen for tab item click
tabItems.forEach(item => {
    item.addEventListener('click', selectItem);
});

const nextSlide = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for next slide
    if (current.nextElementSibling) {
        // Add current to next sibling
        current.nextElementSibling.classList.add('current');
    } else {
        // Add current to start
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for prev slide
    if (current.previousElementSibling) {
        // Add current to prev sibling
        current.previousElementSibling.classList.add('current');
    } else {
        // Add current to last
        slides[slides.length - 1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
    nextSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

prev.addEventListener('click', e => {
    prevSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

// Auto slide
if (auto) {
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
}

// Animate Smooth Scroll
// $('#view-work').on('click', function() {
//   const images = $('#images').position().top;

//   $('html, body').animate(
//     {
//       scrollTop: images
//     },
//     900
//   );
// });


