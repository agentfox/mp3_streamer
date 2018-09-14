
// artist detail
$(document).ready(function(){
    var string_Detail_Artist_Full = $("#detail-artist-descrip-content").text();
    
    function DisplayLessString_DetailArtist(){
        var len_Descrip_Artist_Detail = 0;
        len_Descrip_Artist_Detail = $("#detail-artist-descrip-content").text().length;
        if(len_Descrip_Artist_Detail > 20){
            $("#detail-artist-descrip-content").text($("#detail-artist-descrip-content").text().substr(0,450)+'...');
        }
    }
    
    function DisplayMoreString_DetailArtist(){
        $("#detail-artist-descrip-content").text(string_Detail_Artist_Full);
    }
    
    DisplayLessString_DetailArtist();
    
    $(".detail-artist-more").click(function(){
        DisplayMoreString_DetailArtist();
        $(this).hide();
        $(".detail-artist-less").show();
    });
    
    $(".detail-artist-less").click(function(){
        DisplayLessString_DetailArtist();
        $(this).hide();
        $(".detail-artist-more").show();
    });
    
});
// END 



// detail-artist-remix
$(document).ready(function () {

    $(".detail-artist-remix-slider-button").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".detail-artist-remix-slider-button").removeClass('detail-artist-remix-slider-button-active');
        $(".detail-artist-remix-slider-button").eq(sttSelect).addClass('detail-artist-remix-slider-button-active');
        $(".detail-artist-remix-slide").hide();
        $(".detail-artist-remix-slide").eq(sttSelect).show();
    });
});
// END detail-artist-remix


// detail-artist-trackLabel
$(document).ready(function () {

    $(".detail-artist-trackLabel-slider-button").on("click", function () {
        var sttSelect = $(this).attr("stt");
        $(".detail-artist-trackLabel-slider-button").removeClass('detail-artist-trackLabel-slider-button-active');
        $(".detail-artist-trackLabel-slider-button").eq(sttSelect).addClass('detail-artist-trackLabel-slider-button-active');
        $(".detail-artist-trackLabel-slide").hide();
        $(".detail-artist-trackLabel-slide").eq(sttSelect).show();
    });
});
// END detail-artist-trackLabel