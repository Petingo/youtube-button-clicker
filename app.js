; (function () {
    var container;
    var overlayDelay = 0;
    var adDelay = 6;

    var tmp = setInterval(function () {
        if (window.location.pathname !== '/watch') {
            return;
        }
        container = document.getElementById('player-container');

        if (container) {
            container.arrive(".ytp-ad-overlay-close-button", function () {
                click(this, overlayDelay * 1000);
            })
            container.arrive(".ytp-ad-skip-button.ytp-button", function () {
                click(this, adDelay * 1000);
            })
            clearInterval(tmp);
        }

    }, 500);

    function click(element, delay) {
        setTimeout(function () {
            if (element.fireEvent) {
                element.fireEvent('onclick')
            } else {
                let click = document.createEvent('Events');
                click.initEvent('click', true, false);
                element.dispatchEvent(click);
            }
        }, delay);
    }

})();

