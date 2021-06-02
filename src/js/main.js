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
  const swiper = new Swiper('.swiper-p-container', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    // cssMode: true,
    grabCursor: true,
    effect: "flip",

    // allowTouchMove: false,

    pagination: {
      el: '.projects-pagination',
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
    effect: "cube",
    cubeEffect: {
      slideShadows: false,
    },
  });
  mySwiperImage.controller.control = swiper;
  swiper.controller.control = mySwiperImage;
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

  var next = $(".projects-button-next");
  var prev = $(".projects-button-prev");
  var bullets = $(".projects-pagination");
  
  next.css("margin-left", prev.width() + bullets.width() + 58);
  bullets.css("margin-left", prev.width() + 29);

});

