; (function () {
    var container;
    var overlayDelay = 1000;
    var adDelay = 6000;

    var id = setInterval(function () {
        if (window.location.pathname !== '/watch') {
            return;
        }
        container = document.getElementById('player-container');

        if (container) {
            console.log(container);
            container.arrive(".ytp-ad-overlay-close-button", function () {
                click(this, overlayDelay);
            })
            container.arrive(".ytp-ad-skip-button ytp-button", function () {
                let button = document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0];
                console.log(this);

                while (button) {
                    click(button, 0);
                    button = document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0];
                }
            })
            clearInterval(id);
        }

    }, 1000);

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

