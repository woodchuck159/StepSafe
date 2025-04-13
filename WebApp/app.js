let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=> {
    // set a timeout for the fade in of the spans (aka introductory words)
    setTimeout(()=>{
        logoSpan.forEach((span, idx) =>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        // set a timeout for the fade out of the spans (aka introductory words)
        setTimeout(()=> {
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=> {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 100)
            })
        }, 2600);

        // introduce nice fade-away of black screen
        setTimeout(()=>{
            intro.style.top = "-100vh";
        }, 2300)
    })
})