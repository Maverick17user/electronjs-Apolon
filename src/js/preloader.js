const $ = require('jquery')

$(window).on("load",function () {
    setTimeout(() => {
        $("#labelH2").html('by Maxim Epifanov & Vasiliy Setun')
    }, 1500)
    setTimeout(() => {
        $("#labelH2").html("APOLON")
        $("#labelH2").css("letterSpacing","2px")
        $("#labelH2").css("fontSize","2.5em")
    }, 3000)
    setTimeout(() => {
        $("#preloader").fadeOut(500);
    }, 4500)
});