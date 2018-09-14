

// label descript
$(document).ready(function(){
    var string_detail_song_full = $("#detail-label-descrip-content").text();
    
    function display_less_string_detail_song(){
        var len_descrip_song_detail = 0;
        len_descrip_song_detail = $("#detail-label-descrip-content").text().length;
        if(len_descrip_song_detail > 40){
            $("#detail-label-descrip-content").text($("#detail-label-descrip-content").text().substr(0,350)+'...');
        }
    }
    
    function display_more_string_detail_song(){
        $("#detail-label-descrip-content").text(string_detail_song_full);
    }
    
    display_less_string_detail_song();
    
    $(".detail-label-more").click(function(){
        display_more_string_detail_song();
        $(this).hide();
        $(".detail-label-less").show();
    });
    
    $(".detail-label-less").click(function(){
        display_less_string_detail_song();
        $(this).hide();
        $(".detail-label-more").show();
    });
});


//slider detail-label-artist
$(document).ready(function () {

    $(".detail-label-artist-pages-li").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".detail-label-artist-pages-li").removeClass('detail-label-artist-pages-li-active');
        $(".detail-label-artist-pages-li").eq(sttSelect).addClass('detail-label-artist-pages-li-active');
        $(".detail-label-artist-info").hide();
        $(".detail-label-artist-info").eq(sttSelect).show();
    });
});
//END Slider-detail-label-artist



//slider detail-label-track
$(document).ready(function () {

    $(".detail-label-track-button").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".detail-label-track-button").removeClass('detail-label-track-button-active');
        $(".detail-label-track-button").eq(sttSelect).addClass('detail-label-track-button-active');
        $(".detail-label-track-slide").hide();
        $(".detail-label-track-slide").eq(sttSelect).show();
    });
});

//END Slider-detail-label-track



