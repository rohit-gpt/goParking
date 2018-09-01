$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
      },
    });
  });

$(document).ready(function(){
    $('.timepicker').timepicker({
    	minTime: '11:00:00',
    	maxTime: '23:00:00'
    });
  });

$(document).ready(function(){
    $('select').formSelect();
  });