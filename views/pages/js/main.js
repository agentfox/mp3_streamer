

$(document).ready(function () {
    $("#login-button").click(function () {
        $("#login-form").show();
        $(".extra").show();
    });

    $("#button-me-cancel").click(function () {
        $("#login-form").hide();
        $(".extra").hide();
    });
});

$(document).ready(function () {
    var displaygenres = 0;
    $("#genres-button").click(function () {
        if (displaygenres == 0) {
            $("#genres-detail").show();
            $(this).css("background", "#eee");
            displaygenres = 1;
        } else {
            $("#genres-detail").hide();
            $(this).css("background", "transparent");
            displaygenres = 0;
        }
    })
});

//slider

$(document).ready(function () {
    var stt = 0;
    firstImg = $(".slider-img:first").attr("stt");
    endImg = $(".slider-img:last").attr("stt");
    $(".slider-img").each(function () {
        if ($(this).is(':visible')) {
            stt = $(this).attr("stt");
        }
    });

    function sliderNext() {
        stt++;
        if (stt > endImg) {
            stt = firstImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-li").removeClass('slider-li-active');
        $(".slider-li").eq(stt).addClass('slider-li-active');
    }

    function sliderPrev() {
        stt--;
        if (stt < firstImg) {
            stt = endImg;
        }
        $(".slider-img").hide();
        $(".slider-img").eq(stt).show();
        $(".slider-li").removeClass('slider-li-active');
        $(".slider-li").eq(stt).addClass('slider-li-active');
    }

    var intervalSlider;
    intervalSlider = setInterval(function () {
        sliderNext();
    }, 3000);

    $(".slider-img").on("mouseover", function () {
        clearInterval(intervalSlider);
    });

    $(".slider-img").on("mouseout", function () {
        
        intervalSlider = setInterval(function () {
            sliderNext();
        }, 3000);
    });

    $(".slider-li").on("click", function () {
        var sttLI = $(this).attr("stt");
        $(".slider-li").removeClass('slider-li-active');
        $(".slider-li").eq(sttLI).addClass('slider-li-active');
        $(".slider-img").hide();
        $(".slider-img").eq(sttLI).show();
        stt = sttLI;
    });
});

//top-6-dj

$(document).ready(function () {
    $(".top-6-dj-slider-div").on("click", function () {
        var stt = $(this).attr("stt");
        $(".top-6-dj-content-div").hide();
        $(".top-6-dj-content-div").eq(stt).show();
        $(".top-6-dj-slider-div").removeClass('top-6-dj-slider-div-active');
        $(".top-6-dj-slider-div").eq(stt).addClass('top-6-dj-slider-div-active');
    });
});

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

$(document).ready(function () {
    var playmusic = 0;
    var audio = document.getElementById('myTune');

    function ConvertTime(timeSecond) {
        var hour = 0;
        var minutes = 0;
        var second = 0;
        var stringTime = "";
        hour = Math.floor(timeSecond / 3600);
        timeSecond = timeSecond - hour * 3600;
        minutes = Math.floor(timeSecond / 60);
        timeSecond = timeSecond - minutes * 60;
        second = Math.floor(timeSecond);
        var correctSecond = "";
        if (second < 10) {
            correctSecond = "0" + second;
        } else {
            correctSecond = second;
        }
        if (hour == 0) {
            stringTime = minutes + ":" + correctSecond;
        } else {
            stringTime = hour + ":" + minutes + ":" + correctSecond;
        }
        return stringTime;
    }

    audio.addEventListener('loadedmetadata', function () {
        var lengaudio = parseInt(audio.duration);
        var lengaudioText = ConvertTime(lengaudio);
        document.getElementById("playmusic-end").innerHTML = lengaudioText;
        document.getElementById("playmusic-start").innerHTML = "0:00";
    });

    //event end audio
    audio.onended = function () {
        if (audio.loop == false) {
            PauseMusic();
        }
    };

    //function play music
    function PlayMusic() {
        audio.play();
        playmusic = 1;
        $("#playButton .glyphicon-play").hide();
        $("#playButton .glyphicon-pause").show();
    }

    //function pause music
    function PauseMusic() {
        audio.pause();
        playmusic = 0;
        $("#playButton .glyphicon-pause").hide();
        $("#playButton .glyphicon-play").show();
    }

    //event click loop
    $("#loopButton").click(function () {
        if (audio.loop == false) {
            if (playmusic == 0) {
                PlayMusic();
            }
            audio.loop = true;
            $("#loopButton").css("color", "#fff");
        } else {
            audio.loop = false;
            $("#loopButton").css("color", "#888");
        }

    });

    var intervalPlayMusic;
    //event click playmusic
    $("#playButton").click(function () {
        if (playmusic == 0) {
            PlayMusic();
            intervalPlayMusic = setInterval(function () {
                document.getElementById("playmusic-start").innerHTML = ConvertTime(parseInt(audio.currentTime));
                currentValuePlayMusic = (audio.currentTime / audio.duration) * 100;
                document.getElementById("playmusic-process").value = currentValuePlayMusic;
            }, 100);
        } else {
            PauseMusic();
            clearInterval(intervalPlayMusic);
        }
    });

    //event click fast forward music
    var PlaymusicLenPer;
    $("#playmusic-process").click(function (ev) {
        PlaymusicLenPer = $("#playmusic-process").width() / 100;
        var lenCurrent_playMusic = ev.clientX - $("#playmusic-process").offset().left;
        var Playmusic_currentPer = lenCurrent_playMusic / PlaymusicLenPer;

        document.getElementById("playmusic-process").value = Playmusic_currentPer;
        document.getElementById("myTune").currentTime = (Playmusic_currentPer / 100) * audio.duration;
        document.getElementById("playmusic-start").innerHTML = ConvertTime(audio.currentTime);
    });
    
    //volume in progress
    var volumeLenPer;
    $("#volumeProBar").click(function (ev_volume) {
        volumeLenPer = $("#volumeProBar").width() / 100;
        var lenCurrent_volume = ev_volume.clientX - $("#volumeProBar").offset().left;
        document.getElementById("volumeProBar").value = lenCurrent_volume / volumeLenPer;
        document.getElementById("myTune").volume = document.getElementById("volumeProBar").value / 100;
        if (audio.volume < 0.5) {
            $("#volume .glyphicon-volume-down").show();
            $("#volume .glyphicon-volume-up").hide();
        } else {
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").show();
        }
    });

    //volume in icon
    var oldVolume;
    var oldVolumeLength;
    $("#volumeButton").click(function () {
        if (audio.volume > 0) {
            oldVolume = audio.volume;
            oldVolumeLength = document.getElementById("volumeProBar").value;
            document.getElementById("myTune").volume = 0;
            document.getElementById("volumeProBar").value = 0;
            $("#volume .glyphicon-volume-down").hide();
            $("#volume .glyphicon-volume-up").hide();
            $("#volume .glyphicon-volume-off").show();
        } else {
            document.getElementById("myTune").volume = oldVolume;
            document.getElementById("volumeProBar").value = oldVolumeLength;
            $("#volume .glyphicon-volume-off").hide();
            if (audio.volume < 0.5) {
                $("#volume .glyphicon-volume-down").show();
            } else {
                $("#volume .glyphicon-volume-up").show();
            }
        }
        
    });


});


$(document).ready(function(){
    $("#register-button").click(function(){
        $(".register-form").show();
        $(".extra").show();
    });
    $("#register-form-button-cancel").click(function(){
        $(".register-form").hide();
        $(".extra").hide();
    });
});







