//$(document).ready(function(){
//    var widthString = $("#string-name-right").width();
//    var widthWrap = $(".string-in-img").width();
//    var maxRight = widthWrap - widthString;
//    var locationNow = 0;
//    var trend = 1;
//    var result;
//    var loopStringRun = setInterval(function(){
//        if(locationNow >= maxRight && trend == 1){
//            trend=0;
//        }
//        if(locationNow <= 0 && trend == 0){
//            trend=1;
//        }
//        if(trend == 1){
//            locationNow = locationNow + 1;
//        }else{
//            locationNow = locationNow - 1;
//        }
////        result = locationNow + "px";
//        $("#string-name-right").css('margin-left',locationNow);
////        $("#string-name-right").html(result);
//    },100);
//});