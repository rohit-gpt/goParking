$(document).ready(function(){
    $('.sidenav').sidenav();
  });


$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "City Centre Shalimar Bagh": null,
        "Ambience Mall Gurgaon": null,
        "MGF Metropolitan Gurgaon": null,
        "MGF Metropolis Gurgaon": null,
        "City Centre Mall Gurgaon": null,
        "Sahara Mall Gurgaon": null,
        "Mega Mall Gurgaon": null,
        "Star Mall Gurgaon": null,
        "Select City Walk Saket": null,
        "City Centre Saket": null,
        "DLF Promenade Vasant Kunj": null,
        "Central Plaza Golf Course Road Gurgaon": null
      }
    });
  });

$(document).ready(function(){
    $('select').formSelect();
  });