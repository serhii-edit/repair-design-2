document.addEventListener("DOMContentLoaded", function(event){

  // Lazy load start
  var lazyloadImages;    
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      console.log(observer);
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    }, {
      root: document.querySelector("#container"),
      rootMargin: "0px 0px 300px 0px"
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = $(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = $(window).scrollTop();
          lazyloadImages.each(function() {
              var el = $(this);
              if(el.offset().top < window.innerHeight + scrollTop + 500) {
                var url = el.attr("data-src");
                el.attr("src", url);
                el.removeClass("lazy");
                lazyloadImages = $(".lazy");
              }
          });
          if(lazyloadImages.length == 0) { 
            $(document).off("scroll");
            $(window).off("resize");
          }
      }, 20);
    }

    $(document).on("scroll", lazyload);
    $(window).on("resize", lazyload);
  }
  // lazy load (END)


  const modal = document.querySelector(".modal");
  var modalSubmit = document.querySelector(".modal-submit");

  // ES5 > ES6, use of babel
  modal.onclick = function (e) {
    if(e.target == modal) {
      modal.classList.toggle("modal--visible");
      document.querySelector("body").style.overflow = 'auto';
    };
  };

  window.addEventListener("keydown", function (event) {
    if(event.key == 'Escape') {
      modal.classList.remove("modal--visible");
      document.querySelector("body").style.overflow = 'auto';
    };
  });

  // console.log(modalSubmit);

  window.addEventListener("keydown", function (eventS) {
    if(eventS.key == 'Escape') {
      modalSubmit.classList.remove("modal-submit-visible");
      document.querySelector("body").style.overflow = 'auto';
    };
  });

  modalSubmit.onclick = function (eS) {
    if(eS.target == modalSubmit) {
      modalSubmit.classList.remove("modal-submit-visible");
      document.querySelector("body").style.overflow = 'auto';
    };
  };


  window.onscroll = function() {myFunction()};
  function myFunction() {
    passive: true;
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }





  // Swiper START
  var swiperA = new Swiper('.swiper-p-container', {
    // Optional parameters
    direction: 'horizontal',
    allowTouchMove: false,
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    // cssMode: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 50,
      slideShadows: false,
    },

    // allowTouchMove: false,

    pagination: {
      el: '.projects__pagination',
      type: 'bullets',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  // Swiper END

  var mySwiperImage = new Swiper(".swiper-projects-image", {
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    grabCursor: true,
    allowTouchMove: true,
    // effect: "cube",
    // cubeEffect: {
    //   slideShadows: false,
    // },
    effect: "coverflow",
    coverflowEffect: {
      rotate: 50,
      slideShadows: false,
    },
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    watchSlidesVisibility: true,
    preloadImages: false,
    lazy: true,
  });
  swiperA.controller.control = mySwiperImage;
  mySwiperImage.controller.control = swiperA;

  var swiperTarget = new Swiper(".swiper-c-steps", {
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    allowTouchMove: false,
    spaceBetween: 2,
    navigation: {
      nextEl: '.steps__button-next',
      prevEl: '.steps__button-prev',
    },
    pagination: {
      el: '.steps__pagination',
      type: 'bullets',
      bulletClass: "steps__pagination-bullet",
      bulletActiveClass: "steps__pagination-bullet-active",
    },
    effect: "coverflow",
    coverflowEffect: {
      slideShadows: false,
      depth: 120,
      rotate: 50,
    },

    // breakpoints: {
    //   100: {
    //     pagination: {
    //       dynamicBullets: true,
    //     },
    //   },
    // },
  });

  var swiperTargetImage = new Swiper(".swiper-c-steps-image", {
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    allowTouchMove: false,
    // grabCursor: false,
    spaceBetween: 2,
    // autoHeight: true,

    watchSlidesVisibility: true,
    preloadImages: false,
    lazy: true,

    pagination: {
      el: '.steps__image-pagination',
      type: 'bullets',
      bulletClass: "steps__image-bullet",
      bulletActiveClass: "steps__image-bullet-active",
      bulletElement: "div",
      clickable: true,
    },
    effect: "flip",
    flipEffect: {
      slideShadows: false,
    },
    breakpoints: {
      880: {
        allowTouchMove: false,
      },
      100: {
        allowTouchMove: true,
      },
    }
  });

  swiperTarget.controller.control = swiperTargetImage;
  swiperTargetImage.controller.control = swiperTarget;

  // var buttonPlay = querySelectorAll("#buttonPlay");
  // console.log("Info: " + buttonPlay);

  // buttonPlay.onclick = function (p) {
  //   var player;
  //   function onYouTubeIframeAPIReady() {
  //     player = new YT.Player('player', {
  //       height: '100%',
  //       width: '100%',
  //       videoId: 'ijXqKtxvm48',
  //       events: {
  //         'onReady': onPlayerReady,
  //         'onStateChange': onPlayerStateChange
  //       }
  //     });
  //   }
  // };

});


$(document).ready(function () {

// Modal window, close and open
  var modal = $(".modal");
  var modalBtn = $("[data-toggle=modal]");
  var closeBtn = $(".modal__close");

  var modalSubmit = $(".modal-submit");
  var modalSubmitClose = $(".modal-submit__close");

  modalBtn.on("click", function () {
    modal.toggleClass("modal--visible");
    document.querySelector("body").style.overflow = 'hidden';
  });
  closeBtn.on("click", function () {
    modal.toggleClass("modal--visible");
    document.querySelector("body").style.overflow = 'auto';
  });

  modalSubmitClose.on("click", function () {
    modalSubmit.removeClass("modal-submit-visible");
    document.querySelector("body").style.overflow = "auto";
  })

  // code

  // code


// Check at which height window top, display button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 650) {
      $(".arrow-top").fadeIn();
    } else {
      $(".arrow-top").fadeOut();
    }
  });

  // Click event to scroll top
  $(".arrow-top").click(function () {
    passive: true;
    $("html, body").animate ({scrollTop: 0}, 1250);
    return false;
  });

  var next = $(".projects__button-next.swiper-button-next");
  var prev = $(".projects__button-prev.swiper-button-prev");
  var bullets = $(".projects__pagination.swiper-pagination");
  next.css("margin-left", prev.width() + bullets.width() + 58);
  bullets.css("margin-left", prev.width() + 29); 

  var nextB = $(".steps__button-next");
  var prevB = $(".steps__button-prev");
  var bulletsB = $(".steps__pagination");
  nextB.css("margin-left", prevB.width() + bulletsB.width() + 58);
  bulletsB.css("margin-left", prevB.width() + 29); 

// Form Validation
// Validation of form (modal)
var modalSubmit = $(".modal-submit");
  $(".modal__form").validate({
    errorClass: "valid-error",
    validClass: "valid-valid",
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 1,
        maxlength: 35,
      },
      // compound rule
      userPhone: {
        required: false,
        minlength: 17,
        maxlength: 17,
      },
      userEmail: {
        required: true,
        email: true,
        maxlength: 90,
      },
    },
      messages: {
        userName: {
         required: "Indicate your name!",
         minlength: "Not less than 1 character!",
         maxlength: "Indicate you name a little shorter!"
        },
        userEmail: {
          required: "Indicate correct email!",
          email: "Example: name@domain.com",
        },
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "mailSender.php",
          data: $(form).serialize(),
          dataType: "html",
          success: function (response) {
            console.log("AjaxPHP Code: " + response);
            // alert("Information sent!");\
            $(form)[0].reset();
            modalSubmit.toggleClass("modal-submit-visible");
            document.querySelector("body").style.overflow = "hidden";
            modal.removeClass("modal--visible");
          }
        });
      }
  });
// Validation of form (modal) - (END)

// Validation of form (control)
$(".control__form").validate({
  errorClass: "valid-error",
  validClass: "valid-valid",
  rules: {
    // simple rule, converted to {required:true}
    userName: {
      required: true,
      minlength: 1,
      maxlength: 35,
    },
    // compound rule
    userPhone: {
      required: true,
      minlength: 17,
      maxlength: 17,
    },
  },
    messages: {
      userName: {
       required: "Indicate your name!",
       minlength: "Not less than 1 character!",
       maxlength: "Indicate you name a little shorter!"
      },
      userPhone: {
        required: "Telephone number is required here!",
        minlength: "Indicate full number",
        maxlength: "Indicate full number",
      },
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "mailSender.php",
        data: $(form).serialize(),
        dataType: "html",
        success: function (response) {
          console.log("AjaxPHP Code: " + response);
          // alert("Information sent!");\
          $(form)[0].reset();
          modalSubmit.toggleClass("modal-submit-visible");
          document.querySelector("body").style.overflow = "hidden";
        }
      });
    }
});
// Validation of form (control) - (END)

// Validation of form (footer)
$(".questions__form").validate({
  errorClass: "valid-error",
  validClass: "valid-valid",
  rules: {
    // simple rule, converted to {required:true}
    userName: {
      required: true,
      minlength: 1,
      maxlength: 35,
    },
    // compound rule
    userPhone: {
      required: true,
      minlength: 17,
      maxlength: 17,
    },
    userQuestion: {
      required: true,
      maxlength: 999,
      minlength: 10,
    },
  },
    messages: {
      userName: {
       required: "Indicate your name!",
       minlength: "Not less than 1 character!",
       maxlength: "Indicate you name a little shorter!"
      },
      userPhone: {
        required: "Telephone number is required here!",
        minlength: "Indicate full number",
        maxlength: "Indicate full number",
      },
      userQuestion: {
        required: "Indicate your question",
        maxlength: "Type little bit less please!",
        minlength: "Type little bit more"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "mailSender.php",
        data: $(form).serialize(),
        dataType: "html",
        success: function (response) {
          console.log("AjaxPHP Code: " + response);
          // alert("Information sent!");\
          $(form)[0].reset();
          modalSubmit.toggleClass("modal-submit-visible");
          document.querySelector("body").style.overflow = "hidden";
        }
      });
    }
});
// Validation of form (footer) - (END)



// Mask for form
$('input[type="tel"]').mask('+1 (000) 000-0000', {placeholder: "+1 (___) ___-____"});
// Mask for form (END)

// Form Validation (END)

// ijXqKtxvm48&t
var player;
$(".control__video-play").on("click", function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'jlJE4xwG9vw',
    events: {
      'onReady': playVideo,
      // 'onStateChange': onPlayerStateChange
    }
  });
});

function playVideo(event) {
  event.target.playVideo();

};

});  // Jquery Load DOM

