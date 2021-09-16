// Featured Listings Tabbing

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();



// Tab Slider
$('.tab-slider').owlCarousel({
  loop:true,
  margin:15,
  nav:true,
  navText: ["<i class='fal fa-long-arrow-left'></i>","<i class='fal fa-long-arrow-right'></i>"],
  dots:true,
  center:true,
  responsive:{
      0:{
          items:1,
          margin:20,
          autoplay: true
      },
      600:{
          items:1.4
      },
      1000:{
          items:1.7
      }
  }
})


// Header class 

$(document).ready(function(){



      $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
            $("header").addClass("active");
        }
        else {
            $('header').removeClass("active")
        }
    }); 


    $(window).ready(function() {
      $('.loadLogo').addClass('tranlate')
    })



    $('.hamButton button').click(function(){
      $(this).toggleClass('active');
      $('.navbar').toggleClass('active');
      $('.mobile-overlay').toggleClass('active');
    })

})


// Home Page Counter


var counted = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $('.counting').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    counted = 1;
  }

});


// Listing ThumbNail Slider

$(document).ready(function() {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4;
  var syncedSecondary = true;
  
  sync1.owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: false,
      autoplay: false, 
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);
  
  sync2.on('initialized.owl.carousel', function() {
  sync2.find(".owl-item.center").eq(0).addClass("current");
  })
  
  /* centered items */
  sync2.find('.owl-item').each(function(index) {
  var item = $(this).attr('data-position', index);
  })
  
  sync2.owlCarousel({
  items: 7.5,
  dots: false,
  nav: false,
  loop: true,
  center: true,
  smartSpeed: 200,
  slideSpeed: 1000,
  slideBy: slidesPerPage,
  drag: true,
  responsiveRefreshRate: 100,
  responsive:{
        0:{
            items:2.5,
            margin:20,
            autoplay: true
        },
        600:{
            items:3.7
        },
        1000:{
            items:7.5
        }
      }
  }).on('click', '.owl-item', function(e) {
      var carouselSync1 = $('#sync1').data('owl.carousel');
      e.preventDefault();
  
      var current = $(this).index();
      carouselSync1.to(carouselSync1.relative(current));
      
      /* centered items */
      sync2.trigger('to.owl-carousel', $(this).data('position'));
    });
  
  function syncPosition(el) {
     
      var current = el.item.index;
    
      sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
    
      console.log('currentSync1: ' + current)
    
      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
  }
  
  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  });
  