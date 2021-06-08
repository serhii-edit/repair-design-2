document.addEventListener("DOMContentLoaded", function(event){
  const modal = document.querySelector(".modal");
  // const modalBtn = document.querySelectorAll("[data-toggle=modal]");
  // const closeBtn = document.querySelector(".modal__close");

//   var switchModal = () => {
//     modal.classList.toggle("modal--visible");
//   };

//   modalBtn.forEach(element => {
//     element.addEventListener("click", switchModal);
//   });

//   closeBtn.addEventListener("click", switchModal);
//   window.onclick = function (e) {
//     if(e.target == modal) {
//       modal.classList.toggle("modal--visible");
//     };
//   };

//   window.addEventListener("keydown", function (event) {
//     if(event.key == 'Escape') {
//       modal.classList.remove("modal--visible");
//     };
//   });


  // ES5 > ES6, use of babel
  window.onclick = function (e) {
    if(e.target == modal) {
      modal.classList.toggle("modal--visible");
    };
  };

  window.addEventListener("keydown", function (event) {
    if(event.key == 'Escape') {
      modal.classList.remove("modal--visible");
    };
  });

  window.onscroll = function() {myFunction()};
  function myFunction() {
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
    mousewheel: {
      invert: true,
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
  });

  var swiperTargetImage = new Swiper(".swiper-c-steps-image", {
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    allowTouchMove: false,
    grabCursor: false,
    spaceBetween: 2,
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
    effect: "coverflow",
    coverflowEffect: {
      slideShadows: false,
      depth: 100,
    },
  });

  swiperTarget.controller.control = swiperTargetImage;
  swiperTargetImage.controller.control = swiperTarget;
});


$(document).ready(function () {

// Modal window, close and open
  var modal = $(".modal");
  var modalBtn = $("[data-toggle=modal]");
  var closeBtn = $(".modal__close");

  modalBtn.on("click", function () {
    modal.toggleClass("modal--visible");
  });
  closeBtn.on("click", function () {
    modal.toggleClass("modal--visible");
  });

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

});

