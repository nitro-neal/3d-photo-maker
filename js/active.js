(function ($) {
  "use strict";

  // [ JS Active Code Index ]

  // :: 1.0 Owl Carousel Active Code
  // :: 2.0 Slick Active Code
  // :: 3.0 Footer Reveal Active Code
  // :: 4.0 ScrollUp Active Code
  // :: 5.0 CounterUp Active Code
  // :: 6.0 onePageNav Active Code
  // :: 7.0 Magnific-popup Video Active Code
  // :: 8.0 Sticky Active Code
  // :: 9.0 Preloader Active code

  // :: 1.0 Owl Carousel Active Code
  if ($.fn.owlCarousel) {
    $(".welcome_slides").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      smartSpeed: 1500,
      nav: true,
      navText: [
        "<i class='pe-7s-angle-left'</i>",
        "<i class='pe-7s-angle-right'</i>",
      ],
    });
    $(".app_screenshots_slides").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      smartSpeed: 800,
      margin: 30,
      center: true,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 3,
        },
        992: {
          items: 5,
        },
      },
    });
  }

  // :: 2.0 Slick Active Code
  if ($.fn.slick) {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
    });
    $(".slider-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      asNavFor: ".slider-for",
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      slide: "div",
      autoplay: true,
      centerMode: true,
      centerPadding: "30px",
      mobileFirst: true,
      prevArrow: '<i class="fa fa-angle-left"></i>',
      nextArrow: '<i class="fa fa-angle-right"></i>',
    });
  }

  // :: 3.0 Footer Reveal Active Code
  if ($.fn.footerReveal) {
    $("footer").footerReveal({
      shadow: true,
      shadowOpacity: 0.3,
      zIndex: -101,
    });
  }

  // :: 4.0 ScrollUp Active Code
  if ($.fn.scrollUp) {
    $.scrollUp({
      scrollSpeed: 1500,
      scrollText: '<i class="fa fa-angle-up"></i>',
    });
  }

  // :: 5.0 CounterUp Active Code
  if ($.fn.counterUp) {
    $(".counter").counterUp({
      delay: 10,
      time: 2000,
    });
  }

  // :: 6.0 onePageNav Active Code
  if ($.fn.onePageNav) {
    $("#nav").onePageNav({
      currentClass: "active",
      scrollSpeed: 2000,
      easing: "easeOutQuad",
    });
  }

  // :: 7.0 Magnific-popup Video Active Code
  if ($.fn.magnificPopup) {
    $(".video_btn").magnificPopup({
      disableOn: 0,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: false,
    });
  }

  $('a[href="#"]').click(function ($) {
    $.preventDefault();
  });

  $("#my-file-selector").on("click", function (fun) {
    // alert("click");

    var userEmail = $("#user-email").val();

    if (userEmail.includes("@") == false) {
      fun.preventDefault();
      $("#please-include-email").show();
    }
  });

  $("#my-file-selector").on("change", function () {
    if (this.files && this.files[0]) {
      $("#uploadFileComplete").show();
      $("#uploadFile").hide();
      $("#please-include-email").hide();
      var FR = new FileReader();

      FR.addEventListener("load", function (e) {
        var base64String = e.target.result;
        var base64StringResult = base64String.split(",");
        var metadataParts = base64StringResult[0].split(";");
        var fileType = metadataParts[0].split("/")[1];

        var userEmail = $("#user-email").val();
        var settings = {
          url:
            "https://90j53td4l4.execute-api.us-west-2.amazonaws.com/Prod/upload",
          method: "POST",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            email: userEmail,
            imageBase64: base64StringResult[1],
            imageMetadata: base64StringResult[0],
            fileType: fileType,
          }),
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      });

      FR.readAsDataURL(this.files[0]);
    }
  });

  var $window = $(window);

  if ($window.width() > 767) {
    new WOW().init();
  }

  // :: 8.0 Sticky Active Code
  $window.on("scroll", function () {
    if ($window.scrollTop() > 48) {
      $(".header_area").addClass("sticky slideInDown");
    } else {
      $(".header_area").removeClass("sticky slideInDown");
    }
  });

  // :: 9.0 Preloader Active code
  $window.on("load", function () {
    $("#uploadFileComplete").hide();
    $("#please-include-email").hide();
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  });
})(jQuery);
