// ///$(document).ready(function(){
//   $("#openModal").click(function(){
//     $("#myModal").fadeIn("slow");
//   });
//   $("#closeModal").click(function(){
//     $("#myModal").fadeIn("slow");
//   });

// });

$(document).ready(function(){
  $("#myModal").on('shown.bs.modal', function () {
    $("#myModal").trigger('focus');
  }); 
});

$("#searchCity").on("click", function(){
  $(".card").attr("style", "display:block;");
  
})
