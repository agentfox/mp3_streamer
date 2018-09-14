$(document).ready(function () {

    $(".slider-na-button").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".slider-na-button").removeClass('slider-na-button-active');
        $(".slider-na-button").eq(sttSelect).addClass('slider-na-button-active');
        $(".slider-na-img").hide();
        $(".slider-na-img").eq(sttSelect).show();
    });
});