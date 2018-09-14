//new track
$(document).ready(function () {
    $(".new-tracks-pages-li").on("click", function () {
        var stt = $(this).attr("stt");
        $(".new-track-div").hide();
        $(".new-track-div").eq(stt).show();
        $(".new-tracks-pages-li").removeClass('new-tracks-pages-li-active');
        $(".new-tracks-pages-li").eq(stt).addClass('new-tracks-pages-li-active');
    });
});


//hot remix
$(document).ready(function () {
    $(".hot-remix-pages-li").on("click", function () {
        var stt = $(this).attr("stt");
        $(".hot-remix-div").hide();
        $(".hot-remix-div").eq(stt).show();
        $(".hot-remix-pages-li").removeClass('hot-remix-pages-li-active');
        $(".hot-remix-pages-li").eq(stt).addClass('hot-remix-pages-li-active');
    });
});

//top-liveset
$(document).ready(function () {
    $(".live-set-slider-div").on("click", function () {
        var stt = $(this).attr("stt");
        $(".live-set-content-div").hide();
        $(".live-set-content-div").eq(stt).show();
        $(".live-set-slider-div").removeClass('live-set-slider-div-active');
        $(".live-set-slider-div").eq(stt).addClass('live-set-slider-div-active');
    });
});



//bucket
$(document).ready(function () {
    $(".bucket-pages-li").on("click", function () {
        var stt = $(this).attr("stt");
        $(".bucket-img").hide();
        $(".bucket-img").eq(stt).show();
        $(".bucket-pages-li").removeClass('bucket-pages-li-active');
        $(".bucket-pages-li").eq(stt).addClass('bucket-pages-li-active');
    });
});