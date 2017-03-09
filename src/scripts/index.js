import '../css/base.less'
import '../css/style.less'

$(document).ready(function () {
    $('#main-container').fullpage({
        css3: true,
        fitToSection: false,
        sectionsColor: ['#06A79C'],
        recordHistory: true,
        keyboardScrolling: true,
        scrollOverflow: true,
        scrollOverflowReset: true
    });
});
