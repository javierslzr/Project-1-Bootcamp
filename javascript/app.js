$(document).ready(function(){
  $("#myModal").on('shown.bs.modal', function () {
    $("#myModal").trigger('focus');
  }); 
});

$("#searchCity").on("click", function(){
 // $("#cityImg, #weather, #map, #newsFeed").attr("style", "display:block;");
  $('#paperPlane').fadeOut('slow', function(){
    $('.search-results').fadeIn("slow");
});
  });


  update 1 
//   $('#searchCity').on("click", function(){    
//     $('#paperPlane').attr('style', "display:none;" , function(){
//         $("#cityImg, #weather, #map, #newsFeed").attr('style', "display:block;");
//     });

//     $('#searchCity').on("click" , function(){    
//       $("#cityImg, #weather, #map, #newsFeed").attr('style', "display:none;" , function(){
//         $('#paperPlane').attr('style', "display:block;")
    
//       });
//     });

// });





