$(document).ready(function() {
    if (typeof($.fn.inputmask) === 'undefined') {
        return;
    }
    console.log('init_InputMask');

    $(":input").inputmask();
});
