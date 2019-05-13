const $ = require('jquery')

$(window).on("load",function () {
    setTimeout(() => {
        $("#labelH2").html("APOLON")
        $("#labelH2").css("letterSpacing","2px")
        $("#labelH2").css("fontSize","3em")
    }, 2000)
    setTimeout(() => {
        $("#preloader").fadeOut(500);
    }, 3000)
});