$(document).ready(function(){
    $('.sidenav').sidenav();
  });


$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "City Centre Shalimar Bagh": null
      }
    });
  });

$(document).ready(function(){
    $('select').formSelect();
  });