
    var imageWidth = 2048,
    imageHeight = 1364,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window);

var hotSpots = [{
  'title': 'MOTOR',
  'description': "1 x Rolls-Royce Merlin 45 Supercharged V12 motor, 2.820 metrede 1.470 beygir., Maksimum sürat: 608 km/s Harekat yarıçapı: 762 km Yükseklik sınırı: 10,670 metre Tırmanma hızı: 812 metre / dk",
  'x': 750,
  'y': -60
}, {
  'title': 'GÖVDE',
  'description': "Uzunluk: 8,87 metre, Kanat açıklığı: 11 metre, Yükseklik: 3,5 metre, Kanat alanı: 22,5 metre kare, Boş ağırlık: 2,3 ton., Maksimum kalkış ağırlığı: 3 ton ,",
  'x': 108,
  'y': 200
}, {
  'title': 'Silahlar',
  'description': '2 x 20 mm Hispano Mk. II top, 4.303 kal. Browning makineli tüfekler, 2 x 110 kg bomba',
  'x': 400,
  'y': 0
}, {
  'title': 'MÜRETTEBAT',
  'description': "1 Adet pilot",
  'x': 80,
  'y': -75
}];

function appendHotSpots() {
  for (var i = 0; i < hotSpots.length; i++) {
    var $hotSpot = $('<div>').addClass('hot-spot');
    $('.container').append($hotSpot);
  }
  positionHotSpots();
}

function appendSpeechBubble() {
  var $speechBubble = $('<div>').addClass('speech-bubble');
  $('.container').append($speechBubble);
}

function handleHotSpotMouseover(e) {
  var $currentHotSpot = $(e.currentTarget),
      currentIndex = $currentHotSpot.index(),
      $speechBubble = $('.speech-bubble'),
      title = hotSpots[currentIndex]['title'],
      description = hotSpots[currentIndex]['description'],
      hotSpotTop = $currentHotSpot.offset().top,
      hotSpotLeft = $currentHotSpot.offset().left,
      hotSpotHalfSize = $currentHotSpot.width() / 2,
      speechBubbleHalfSize = $speechBubble.width() / 2,
      topTarget = hotSpotTop - $speechBubble.height(),
      leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;
  
  $speechBubble.empty();
  $speechBubble.append($('<h1>').text(title));
  $speechBubble.append($('<p>').text(description));
  
  $speechBubble.css({
    'top': topTarget - 20,
    'left': leftTarget,
    'display': 'block'
  }).stop().animate({
    opacity: 1
  }, 200);
}

function handleHotSpotMouseout(){
  var $speechBubble = $('.speech-bubble');
  $speechBubble.stop().animate({
    opacity: 0
  }, 200, function(){
    $speechBubble.hide();
  });
}

function positionHotSpots() {
  var windowWidth = $window.width(),
    windowHeight = $window.height(),
    windowAspectRatio = windowWidth / windowHeight,
    $hotSpot = $('.hot-spot');

  $hotSpot.each(function(index) {
    var xPos = hotSpots[index]['x'],
        yPos = hotSpots[index]['y'],
        desiredLeft = 0,
        desiredTop = 0;

    if (windowAspectRatio > imageAspectRatio) {
      yPos = (yPos / imageHeight) * 100;
      xPos = (xPos / imageWidth) * 100;
    } else {
      yPos = ((yPos / (windowAspectRatio / imageAspectRatio)) / imageHeight) * 100;
      xPos = ((xPos / (windowAspectRatio / imageAspectRatio)) / imageWidth) * 100;
    }

    $(this).css({
      'margin-top': yPos + '%',
      'margin-left': xPos + '%'
    });

  });
}

appendHotSpots();
appendSpeechBubble();
$(window).resize(positionHotSpots);
$('.hot-spot').on('mouseover', handleHotSpotMouseover);
$('.hot-spot').on('mouseout', handleHotSpotMouseout);

var nav = $('nav');
var line = $('<div />').addClass('line');

line.appendTo(nav);

var active = nav.find('.active');
var pos = 0;
var wid = 0;

if(active.length) {
  pos = active.position().left;
  wid = active.width();
  line.css({
    left: pos,
    width: wid
  });
}

nav.find('ul li a').click(function(e) {
  e.preventDefault();
  if(!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
    
    nav.addClass('animate');

    var _this = $(this);

    nav.find('ul li').removeClass('active');

    var position = _this.parent().position();
    var width = _this.parent().width();

    if(position.left >= pos) {
      line.animate({
        width: ((position.left - pos) + width)
      }, 300, function() {
        line.animate({
          width: width,
          left: position.left
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    } else {
      line.animate({
        left: position.left,
        width: ((pos - position.left) + wid)
      }, 300, function() {
        line.animate({
          width: width
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    }

    pos = position.left;
    wid = width;
  }
});


function showContent(contentId) {
    var icerikler = document.getElementsByClassName("icerik");
    for (var i = 0; i < icerikler.length; i++) {
      icerikler[i].style.display = "none";
    }
  
    var seciliIcerik = document.getElementById(contentId);
    seciliIcerik.style.display = "block";
  }
  