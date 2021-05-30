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
    $("html, body").animate ({scrollTop: 0}, 1500);
    return false;
  });

});

