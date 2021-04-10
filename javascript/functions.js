let totalCircles = 0;
let count = 0;

let interval = null;

$(document).ready(function() {

  $("#start").click(function() {
    $(".container-outside").show();

    for (let x = 0; x < 100; x++) {
      $(".container-inside").append(`<div class="box box-${x}"></div>`);
    }

    $(this).attr("disabled", true);

    interval = setInterval(validGame, 1000);

    fillCircle();
    validateHandleClick();
  });

  $("#onclose-modal").click(function() {
    location.reload();
  });
});

function validGame() {
  const currentTime = $("#time").html();
  const validateCircle = totalCircles === count;

  if (currentTime == 0 || validateCircle) {
    clearInterval(interval);

    const textModal = validateCircle
      ? 'Você ganhou!'
      : 'Você perdeu!'
    
    // Exibição da modal
    $("#modal-game").css("display", "block").fadeIn("slow");
    $(".modal-message").text(textModal);

    // Definindo blur para quando o modal estiver aberto
    $(".menu").css("filter", "blur(13px)");
    $(".container-outside").css("filter", "blur(13px)");

    return;
  }

  $("#time").html(currentTime - 1);
}

function fillCircle() {
  for (let x = 0; x < 45; x++) {
    const randomNumber = Math.floor(Math.random() * 99 + 1);
    
    const selectorDiv = `.box-${randomNumber}`;

    const isMarked = $(selectorDiv).hasClass("marked");

    if (isMarked) continue;

    totalCircles++;

    $(selectorDiv).addClass("marked");

    $(selectorDiv).append("<div class='circle'></div>").hide().fadeIn("slow");
  }
}

function validateHandleClick() {
  $(".box").click(function() {
    const isMarked = $(this).hasClass("marked");
    
    if (isMarked) {
      $(this).children().hide();
      $(this).removeClass("marked");
      count++;
    }
    
    console.log('totalItems -> ', totalCircles);
    console.log('count -> ', count);
  });
}