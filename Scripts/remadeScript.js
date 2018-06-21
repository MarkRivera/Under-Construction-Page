$(document).ready(function(){

  function startBackground (){
    var stars = new Canvases();
    stars.appendCanvas(stars.canvas);
    stars.paintStars(1, stars.canvas);
    stars.paintStars(0.1, stars.canvas);
  };



function Canvases() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvasContainer = document.getElementById("canvasContainer");
  this.canvas = document.createElement('canvas'),
  this.addAttr = function(element){
    $(element).attr({
      width: window.innerWidth,
      height: window.innerHeight,
      id: 'canvas'
    });
  },
  this.appendCanvas = function(element) {
    this.addAttr(element);
    this.canvasContainer.appendChild(element);
  },

  this.getRandomValue = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },

  this.paintStars = function(opacity, element){
    var ctx = element.getContext('2d');
      for (i=0; i<150; i++) {
        var xPos = this.getRandomValue(0, this.width);
        var yPos = this.getRandomValue(0, this.height);

        ctx.fillStyle = 'rgba(255,255,255,'+opacity+')';
        ctx.beginPath();
        ctx.arc(xPos, yPos, 1, 0, 2 * Math.PI);
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#FFF";
        ctx.fill();
      };
  };
};

//Make Mark Move

var astroMark = document.getElementById('spaceMark');

function Astros () {
  this.node = astroMark;
  this.width = astroMark.width;
  this.height = astroMark.height;
  this.xPos = 0;
  this.yPos = 0;
};

var mark = new Astros();

function moveMark () {
  var xPos = mark.xPos;
  var yPos = mark.yPos;
  var dx = 1;
  var dy = 1;
  var id = setInterval(frame, 5);
  function frame() {
    if (xPos + dx < 0) {
      dx = -dx
    }
    if (yPos + dy < 0) {
      dy = -dy
    }

    if (xPos + dx > window.innerWidth - mark.width) {
      dx = -dx
    }
    if (yPos + dy > window.innerHeight - mark.height){
      dy = -dy
    }
    else {
      xPos += dx;
      yPos += dy;
      astroMark.style.top = yPos+'px';
      astroMark.style.left = xPos+'px';
    }
  }
};

function rotateMark (){
  var angle = 0;
  setInterval(function(){
    angle += 3;
    $('#spaceMark').rotate(angle)
  }, 75);
};

//Nark's Movement
rotateMark();
moveMark();

//Button Functions
var contactOpen = false;

$('#contactMe').on('click', function(event){
  var coverPanel = $('.coverPanel');
  var contactPanel = $('#contactPanel');

  contactOpen = true;

if(contactOpen){
  if($('#emailForm').hasClass('emailInactive')){
     $('#emailForm').removeClass('emailInactive').addClass('emailActive');
  };
};

$('#emailForm').on('click', function(event){
  if (event.target == document.getElementById('emailForm') || document.getElementById('field')){
    event.stopPropagation();
    return
  };
  if($('#emailForm').hasClass('emailActive')){
      $('#emailForm').toggleClass('emailActive');
      $('#emailForm').addClass('emailInactive');
  };
});

  if (contactOpen) {
    $('.burgerBit').addClass('activeBurger');
    $('.burgerBit').on('click', function(event){
      if (event.target != document.getElementById('pattyOne') && document.getElementById('pattyTwo')){
        return
      }
      if (event.target == document.getElementById('pattyOne') && document.getElementById('pattyTwo')){
        if(coverPanel.hasClass('activeCover')){
          coverPanel.toggleClass('activeCover');
          $('#contactPanel').toggleClass('active');
          coverPanel.toggleClass('inactiveCover');
          $('#contactPanel').toggleClass('inactive');
        }
      };
    });
  };

  if (!coverPanel.hasClass('activeCover')) {
    coverPanel.toggleClass('activeCover');
  }
  if (coverPanel.hasClass('inactiveCover')){
    coverPanel.toggleClass('inactiveCover');
  }

  if (!$('.contactPanel').hasClass('active')) {
    $('#contactPanel').toggleClass('active');
  }
  if ($('#contactPanel').hasClass('inactive')) {
    $('#contactPanel').toggleClass('inactive');
  }

  coverPanel.on('click', function(event){
    if (event.target == document.getElementById('contactPanel') || document.getElementById('emailActive')){
      return
    }


    if(event.target == document.getElementById('coverPanel') || document.getElementById('pattyOne') || document.getElementById('pattyTwo')){
      if(coverPanel.hasClass('activeCover')){
        coverPanel.toggleClass('activeCover');
        $('#contactPanel').toggleClass('active');
        coverPanel.toggleClass('inactiveCover');
        $('#contactPanel').toggleClass('inactive');
      };
    if(contactOpen) {
      $('.burgerBit').removeClass('activeBurger');
      if($('#emailForm').hasClass('emailActive')){
          $('#emailForm').toggleClass('emailActive');
          $('#emailForm').addClass('emailInactive');
      };
    };
  };
  });
});


$('#emailForm').on('submit', function(event){
  var input = $('#email').val();
  var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  if (!regEx.test(input)) {
    event.stopPropagation();
    event.preventDefault();
    $('#badInput').css('display', 'inline-block');
  }

  else{
    event.preventDefault();
    $('#badInput').css('display', 'none');
    $.ajax({
      url: 'Scripts/form-to-email.php',
      type: 'POST',
      data: {
        email: $('#email').val(),
        message: $('#message').val()
      },
      success: function(){
        document.getElementById('emailForm').innerHTML ='<p class="successMessage">Message Sent! I will reach you shortly</p>';
      },
    });
  }
});


function rotateBurgerBits () {
  $('#pattyOne').rotate(45);
  $('#pattyTwo').rotate(-45);
}



//This is where the code will make it visible on the page: 'Initialize'
startBackground();
rotateBurgerBits();
});
