; (function () {

    var container;

    var videoAdDelay = 5;
    var overlayAdDelay = 3;

    chrome.storage.sync.get({
        videoAdDelay: 5,
        overlayAdDelay: 3
    }, function (items) {
        videoAdDelay = items.videoAdDelay;
        overlayAdDelay = items.overlayAdDelay;
    });



    var tmp = setInterval(function () {
        if (window.location.pathname !== '/watch') {
            return;
        }
        container = document.getElementById('player-container');

        if (container) {
            container.arrive(".ytp-ad-overlay-close-button", function () {
                click(this, overlayAdDelay * 1000);
            })
            container.arrive(".ytp-ad-skip-button.ytp-button", function () {
                click(this, videoAdDelay * 1000);
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

