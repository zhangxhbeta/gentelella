$(document).ready(function() {
    if (typeof($.fn.slideToggle) === 'undefined') {
        return;
    }
    console.log('init_compose');

    $('#compose, .compose-close').click(function() {
        $('.compose').slideToggle();
    });
});
