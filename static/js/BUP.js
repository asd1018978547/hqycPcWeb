//$(function ($) {

  export const BUP = function (beishu) {
    var $element = this;
    var $className = $element.attr("class");
   	var $class1 //class 与 beother 变量
    // If the target element is not an image
    if (!$element.is("img")) {
      console.log("%c Blowup.js Error: " + "%cTarget element is not an image.", 
        "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;",
        "background: #FCEBB6; color: #F07818; font-size: 17px;");
      return;
    }

    // Constants
    var $IMAGE_URL    = $element.attr("src");
    var $IMAGE_WIDTH  = $element.width();
    var $IMAGE_HEIGHT = $element.height();
    var NATIVE_IMG    = new Image();
    NATIVE_IMG.src    = $element.attr("src");
    NATIVE_IMG.width = 380;
    NATIVE_IMG.height = 380;


    // Default attributes
    var defaults = {
      round      : true,
      width      : 200,
      height     : 200,
      background : "#FFF",
      shadow     : "0 8px 17px 0 rgba(0, 0, 0, 1)",
      border     : "6px solid #FFF",
      cursor     : true,
      zIndex     : 999999
    }

    // Update defaults with custom attributes
    var $options = defaults;

    // Modify target image
    $element.on('dragstart', function (e) { e.preventDefault(); });
    $element.css("cursor", $options.cursor ? "crosshair" : "none");

    // Create magnification lens element
    var lens = document.createElement("div");
    lens.id = ""+$className+"BlowupLens";

    // Attack the element to the body
    $("body").append(lens);

    // Updates styles
    var $blowupLens = $("#"+lens.id);

    $blowupLens.css({
      "position"          : "absolute",
      "display"           : "none",
      "pointer-events"    : "none",
      "zIndex"            : $options.zIndex,
      "width"             : $options.width,
      "height"            : $options.height,
      "border"            : $options.border,
      "background"        : $options.background,
      "border-radius"     : $options.round ? "50%" : "none",
      "box-shadow"        : $options.shadow,
      "background-repeat" : "no-repeat",
      "box-sizing":'border-box'
    });

    // Show magnification lens
    $element.mouseenter(function () {
    	$class1 = $element.attr("class");
    	$blowupLens = $("#"+$class1+"BlowupLens");
      $blowupLens.css("display", "block");
    })

    // Mouse motion on image
    $element.mousemove(function (e) {
      fdShow(e);
    })

    // 鼠标移除
    $element.mouseleave(function () {
      document.onmousewheel = null;
        /*$blowupLens = $("#"+$class1+"BlowupLens");*/
      $blowupLens.css("display", "none");
    })
    $element.on('mousewheel',function(){
      var e = event || window.event;
        e.preventDefault();
        if(e.wheelDelta === 120){
          beishu+=0.1;
          beishu=beishu>5?5:beishu;
        }
        if(e.wheelDelta === -120){
          beishu-=0.1;
          beishu = beishu<-0.6?-0.6:beishu;
        }
        fdShow(e)
    })
    function fdShow(e){
      // Lens position coordinates
      var lensX = e.pageX - $options.width / 2;
      var lensY = e.pageY - $options.height / 2;
      // Relative coordinates of image
      var relX = e.offsetX;
      var relY = e.offsetY;
      // Zoomed image coordinates
      var zoomX = -Math.floor(relX / $element.width() * NATIVE_IMG.width - $options.width / 2);
      var zoomY = -Math.floor(relY / $element.height() * NATIVE_IMG.height - $options.height / 2);
      var bgSize,baseSize = 1;
      zoomX = zoomX+(zoomX*beishu-100*beishu);
      zoomY = zoomY+(zoomY*beishu-100*beishu);
      bgSize =NATIVE_IMG.width*(baseSize+beishu);
      // 尝试使用滚轮控制放大
      //尝试结束
      // Apply styles to lens
      var o = {
        left                  : lensX,
        top                   : lensY,
        "background-image"    : "url(" + $IMAGE_URL + ")",
        "background-position" : zoomX + "px " + zoomY+"px",
        "background-size"  : bgSize
      }
      $blowupLens.css(o);
    }
  }
//})
