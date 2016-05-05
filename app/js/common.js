/**
 * Created by Userman on 5/5/16.
 */
$(document).ready(function () {
    var url = window.location.toString();
    $('.navbar-nav li a[href="' + url.substring(url.indexOf('#')) + '"]').parent().addClass('active');
    $('.navbar-nav li a[href="' + url.substring(url.indexOf('#'), url.length - 1) + '"]').parent().addClass('active');
    console.log('>>>>>>>> ' + url.substring(url.indexOf('#')));
})

$('.navbar-nav li').click(function (e) {
    //e.preventDefault();
    $('.navbar-nav li.active').removeClass('active');
    var $this = $(this);
    if (!$this.hasClass('active')) {
        $this.addClass('active');
    }
//    $(".active").toggleClass("active", false);
});

