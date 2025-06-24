$('.projects').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    prevArrow: '<span class="prevArrow"><i class="fa-solid fa-chevron-left"></i></span>',
    nextArrow: '<span class="nextArrow"><i class="fa-solid fa-chevron-right"></i></span>',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '80px',
                slidesToShow: 1
            }
        }
    ]
});