$(document).ready(function(){
  $('.carusel__inner').slick({
  speed: 1200,
  //adaptiveHeight: true,
  prevArrow: '<button type="button" class="slick-prev"><img src="icons/right.svg" alt=""></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="icons/left.svg" alt=""></button>',
  responsive:[
  {
    breakpoint: 992,
    settings: {
      dots: true,
      arrows: false
    }
  }
]
});
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__lists_active)', function() {
    $(this)
      .addClass('catalog__lists_active').siblings().removeClass('catalog__lists_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__contant').eq(i).toggleClass('catalog-item__contant_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.model__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  })
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .model__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  function valideForms(form) {
    $(form).validate({
      rules:{
        name: {
          required: true,
          minlenght:2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Напишіть ім'я",
          minlenght: jQuery.validator.format("Ведіть {0}  символа!")
        },
        phone: "Ведіть ваш номер телефону",
        email: {
          required: "Напишіть вашу пошту",
          email: "Не вірна адреса пошти"
      }
    }
    });
  };
  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

});
