/**************** BEGIN: EDIT HERE FOR GALLERIES ****************/

$(document).ready(function() {
  // Load default Juicebox gallery (most recent)
  loadGallery('nut19gallery/');
  // Link filter buttons to load appropriate gallery
  $("#nut19button").on("click", function(){loadGallery('nut19gallery/');});
  $("#donq19button").on("click", function(){loadGallery('donq19gallery/');});
  $("#nut18button").on("click", function(){loadGallery('nut18gallery/');});
  $("#cdf18button").on("click", function(){loadGallery('cdf18gallery/');});
  $("#nut17button").on("click", function(){loadGallery('nut17gallery/');});
  $("#cdf17button").on("click", function(){loadGallery('cdf17gallery/');});
  $("#nut16button").on("click", function(){loadGallery('nut16gallery/');});
  $("#cdf16button").on("click", function(){loadGallery('cdf16gallery/');});
  $("#nut15button").on("click", function(){loadGallery('nut15gallery/');});
  $("#social15button").on("click", function(){loadGallery('social15gallery/');});
  $("#cdf15button").on("click", function(){loadGallery('cdf2015gallery/');});
  $("#nut14button").on("click", function(){loadGallery('nut14gallery/');});
  $("#cdf14button").on("click", function(){loadGallery('cdf14gallery/');});
  $("#photoshoot13button").on("click", function(){loadGallery('photoshoot13gallery/');});

/**************** END: EDIT HERE FOR GALLERIES ****************/

  // Add "current" class to currently selected gallery (to highlight appropriately)
  $('#filter button').click(function(){
    $('#filter button').removeClass('current');
      $(this).addClass('current');
      var selector = $(this).attr('data-filter');
      return false;
  });

  // Load dancers.tsv
  jQuery.get('dancers.tsv', function(data) {
    // Parse CSV
    var parsed = Papa.parse(data, {
      header: true
    });
    // Create global dancers dictionary (key = dancer id)
    window.dancersDict = {};
    parsed.data.forEach(function(dancer) {
      if (dancer['ID']) dancersDict[dancer['ID']] = dancer;
    });
    // Display dancers (in the order they appear in CSV file)
    displayDancers(parsed.data);
  });

});

/**************** BEGIN: EDIT HERE FOR FEATURED PHOTOS ****************/

// Background header photo at the top of the page
$('#header').css("background-image", "url(img/header.jpg)");

// Featured photo in About section
$('#about-photo img').attr("src", "img/about.jpg");

/**************** END: EDIT HERE FOR FEATURED PHOTOS ****************/

// Append each dancer's picture and name div to the dancers section
function displayDancers(dancers) {
  dancers.forEach(function(dancer) {
    if (dancer['Name']) {
      $('#section-dancers div.row').append(`
        <div id="${dancer['ID']}" class="dancer col-sm-6 col-md-4 col-lg-3 col-xl-2" data-toggle="modal" data-target="#dancer-modal" data-dancer="${dancer['ID']}">
          <img src="img/dancers/${dancer['Photo']}">
          <p class="name">${dancer['Name']}</p>
          ${ dancer['Position'] == "" ? "" : `<p class="role">${dancer['Position']}</p>` }
          <p class="major">${dancer['Major_Year']}</p>
        </div>
      `);
    }
  });
}

// Populate dancer bio modal on click
$('#dancer-modal').on('show.bs.modal', function(event) {
  var dancerId = $(event.relatedTarget).data('dancer');
  var dancerInfo = window.dancersDict[dancerId];

  $("#dancer-modal #bio-photo").attr("src",`img/dancers/${dancerInfo['Photo']}`);
  $('#dancer-modal #bio-name').text(`${dancerInfo['Name']}`);
  $('#dancer-modal #bio-major').text(`${dancerInfo['Major_Year']}`);
  $('#dancer-modal #bio-hometown').text(`${dancerInfo['Bio_Hometown']}`);
  $('#dancer-modal #bio-background').text(`${dancerInfo['Bio_Background']}`);
  $('#dancer-modal #bio-memory').text(`${dancerInfo['Bio_Memory']}`);
  $('#dancer-modal #bio-fact').text(`${dancerInfo['Bio_Fun_Fact']}`);
});

// Juicebox helper function
function loadGallery(base) {
  new juicebox({
    baseUrl : `galleries/${base}`,
    containerId : 'juicebox-container',
    backgroundColor : '010103',
    galleryWidth:'100%',
    galleryHeight:'100%'
  });
}

var nav = $("nav.navbar")

// Smooth scrolling for anchor elements to sections on the page
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            // Offset scroll so we don't go too far down
            scrollTop: target.offset().top - nav.height() - 40
        }, 1000);
    }
});

// Nav opacity change
const headerHeight = $("#header").height();
$(window).on('scroll', function () {
  // Fetch scroll position
  var scrollTop = $(this).scrollTop();

  if (scrollTop <= headerHeight) {
    // Scale alpha by percentage of the way scrolled down (0 at top, 1 at bottom)
    var alpha = 1 - ((headerHeight - scrollTop) / headerHeight);
    // Clamp alpha between 0 and 1
    alpha = Math.min(1, Math.max(0, alpha));
    // Assign to nav background color
    nav.css('backgroundColor', 'rgba(1,1,3,' + alpha + ')');
  }
});
