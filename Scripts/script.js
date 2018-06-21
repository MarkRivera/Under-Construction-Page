$(document).ready(function(){
  (function(){
    var backgroundSpace = document.getElementById('canvas');
    var ctx = backgroundSpace.getContext("2d");
    initialize();
    drawStars();
    //Resize Functions
    function initialize(){
      //Adding Event Listener here:
      window.addEventListener('resize', resizeCanvas, false);
      //draw canvas borders
      resizeCanvas();
    };

    function fillSpace(){
      var spaceColor = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      spaceColor.addColorStop(0.8,"#11051b");
      spaceColor.addColorStop(1, "#220a37")
      ctx.fillStyle = spaceColor;
      ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    };

    function resizeCanvas(){
      backgroundSpace.width = window.innerWidth;
      backgroundSpace.height = window.innerHeight;
      fillSpace();
      drawStars(1);
      drawStars(0.1);
    };

    //Draw Stars Functions
    function drawStars (opacity){
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      var opacity = opacity;
      for (i=0; i<150; i++) {
        function getRandomValue (min,max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }

          var xPos = getRandomValue(0,viewportWidth);
          var yPos = getRandomValue(0, viewportHeight);
          ctx.fillStyle = 'rgba(255,255,255,'+opacity+')';
          ctx.beginPath();
          ctx.arc(xPos, yPos, 1, 0, 2 * Math.PI);
          ctx.shadowBlur = 2;
          ctx.shadowColor = "#FFF";
          ctx.fill();
      }
    };
  })();

  //Button Functions
  $('#call-to').on('click', function(){
    alert("You've sent an email!");
  });


  //FLoating Functions

  var me = $('#AstroMe');


  function floatingAround (){
    var myDefaultPos = me.position();
    var xPos = myDefaultPos.left;
    var yPos = myDefaultPos.top;
    var newX = xPos+1;
    var newY = yPos+1;
    me.offset({top: newY, left: newX});
  };


  setInterval(floatingAround,12);

  function rotatingAround(){
    var angle = 0;
    setInterval(function(){
      angle+=3;
      me.rotate(angle);
    },50);
  };
  rotatingAround();

  //Collision Functions

});
