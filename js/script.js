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

  function validateForms(form){
          $(form).validate({
              rules: {
                  name: {
                      required: true,
                      minlength: 2
                  },
                  phone: "required",
                  email: {
                      required: true,
                      email: true
                  }
              },
              messages: {
                  name: {
                      required: "Пожалуйста, введите свое имя",
                      minlength: jQuery.validator.format("Введите {0} символа!")
                    },
                  phone: "Пожалуйста, введите свой номер телефона",
                  email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                  }
              }
          });
      };
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
    //smoth scroll and pague up

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      }
      else {
        $('.pageup').fadeOut();
      }
    });
    $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } // End if
  });
  new WOW().init();
});
