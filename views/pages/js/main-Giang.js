

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

//event tag play music

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

