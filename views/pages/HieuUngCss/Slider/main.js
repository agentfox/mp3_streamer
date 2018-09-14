$(document).ready(function(){

    var stt = 0;
    var firstImg = $(".slider-img:first").attr("stt");
    var endImg = $(".slider-img:last").attr("stt");
    
    $(".slider-img").each(function(){
       if($(this).is(':visible')){
           stt = $(this).attr("stt");
       } 
    });

    function sliderNext(){
        stt++;
        if(stt > endImg){
            stt = firstImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-button").removeClass("slider-button-active");
        $(".slider-button").eq(stt).addClass("slider-button-active");
    }
    
    function sliderPrev(){
        stt--;
        if(stt < firstImg){
            stt = endImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-button").removeClass("slider-button-active");
        $(".slider-button").eq(stt).addClass("slider-button-active");
    }
    
    var interval_Slider = setInterval(function(){
        sliderNext();
    },3000);
    
    $(".slider-img").on("mouseover", function () {
        clearInterval(interval_Slider);
    });

    $(".slider-img").on("mouseout", function () {
        interval_Slider = setInterval(function () {
            sliderNext();
        }, 3000);
    });

    $(".slider-button").on("click", function () {

        var sttSelect = $(this).attr("stt");
        $(".slider-button").removeClass('slider-button-active');
        $(".slider-button").eq(sttSelect).addClass('slider-button-active');
        $(".slider-img").hide();
        $(".slider-img").eq(sttSelect).show();
        stt = sttSelect;
    });
    
});