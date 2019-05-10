const $ = require('jquery')

$(window).on("load",function () {
    setTimeout(() => {
        $("#labelH2").html('Developers: Maxim Epifanov & Vasiliy Setun')
    }, 1500)
    setTimeout(() => {
        $("#labelH2").html("APOLON")
        $("#labelH2").css("letterSpacing","2px")
        $("#labelH2").css("fontSize","3em")
    }, 3000)
    setTimeout(() => {
        $("#preloader").fadeOut(500);
    }, 4500)
});