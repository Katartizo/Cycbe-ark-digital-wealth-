(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Roadmap carousel
    $(".roadmap-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });



const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'),
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message'),
      contactBtn = document.querySelector('.contact-button'); // Select the button

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Check Inputs
    const inputs = [contactName, contactEmail, contactSubject, contactMessage];
    let hasError = false;

    inputs.forEach(input => {
        if(input.value.trim() === ''){
            hasError = true;
            input.classList.add('input-error'); 
            if(!input.dataset.tempPlaceholder) input.dataset.tempPlaceholder = input.placeholder;
            input.placeholder = "Don't leave empty space"; 
        } else {
             input.classList.remove('input-error');
             if(input.dataset.tempPlaceholder) input.placeholder = input.dataset.tempPlaceholder;
        }
    });

    if(hasError){
        // Remove error styles after 3 seconds
        setTimeout(() => {
            inputs.forEach(input => {
                input.classList.remove('input-error');
                if(input.dataset.tempPlaceholder) input.placeholder = input.dataset.tempPlaceholder;
            });
        }, 3000);
    } else {
        // 2. Change Button to "Sending..."
        const originalText = contactBtn.innerText;
        contactBtn.innerText = 'Sending...';

        // 3. Send Email
        // YOUR SPECIFIC KEYS
        emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
            .then(() => {
                // SUCCESS: Change Button to "Sent" + Checkmark
                contactBtn.innerHTML = 'Sent <i class="ri-check-line"></i>';
                
                // Show small message below (optional backup)
                message.textContent = 'Message sent successfully ✅';
                message.style.color = 'green';
                
                // Reset form
                contactForm.reset();

                // Reset Button after 5 seconds
                setTimeout(() => { 
                    message.textContent = '';
                    contactBtn.innerText = 'Send Message'; // Back to original
                }, 5000);
                
            }, (error) => {
                // ERROR
                message.textContent = 'Message not sent (service error) ❌';
                message.style.color = 'red';
                contactBtn.innerText = 'Send Message'; // Reset button immediately
                console.log('FAILED...', error);
            });
    }
}

if(contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}





    
})(jQuery);

