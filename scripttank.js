
    var imageWidth = 2048,
    imageHeight = 1364,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window);

var hotSpots = [{
  'title': 'ZIRH',
  'description': "Panzer I'in taretinin üst kısmı 8 mm, kulenin alt ve üstü 6 mm, diğer yerleri 13 mm dökümsüz ya da yarı dökümlü homojen çelik zırh ile kaplanmıştı.",
  'x': 400,
  'y': -50
}, {
  'title': 'MOTOR',
  'description': "Panzer IA 57 beygirlik Krupp M305 4-silindirli benzinli motoru bulunuyordu. Bu motor araca yolda 37 km/s hız ve 145 km menzil sağlıyordu. Panzer IB'de ise 100 beygirlik 6 silindirli Maybach NL38TR motor bulunuyordu. Bu motorda araca yolda 40 km/s sürat ve 170 km menzil sağlıyordu.",
  'x': 108,
  'y': 200
}, {
  'title': 'Silah',
  'description': 'Taretinde iki adet 7.92 mm makineli tüfek taşır. Panzer I piyade ve silahsız araçlara karşı kullanışlı, zırhlı araçlara karşı etkisizdi.',
  'x': 40,
  'y': -170
}, {
  'title': 'MÜRETTEBAT',
  'description': "Panzer I'de iki kişilik mürettebat bulunuyordu. Sürücü ön bölümde komutan ise taret kısmında otururdu. Komutan silahları ve telsizi kullanırdı.",
  'x': -600,
  'y': 100
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
  