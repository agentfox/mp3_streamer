// song detail
$(document).ready(function(){
    var string_Full = $("#short-text-content").text();
    
    function Display_Short_String(){
        var len_String_Full = 0;
        len_String_Full = $("#short-text-content").text().length;
        if(len_String_Full > 20){
            $("#short-text-content").text($("#short-text-content").text().substr(0,250)+'...');
        }
    }
    
    function Display_More_String(){
        $("#short-text-content").text(string_Full);
    }
    
    Display_Short_String();
    
    $(".short-text-content-more").click(function(){
        Display_More_String();
        $(this).hide();
        $(".short-text-content-less").show();
    });
    
    $(".short-text-content-less").click(function(){
        Display_Short_String();
        $(this).hide();
        $(".short-text-content-more").show();
    });

});