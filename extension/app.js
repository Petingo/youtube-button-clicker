; (function () {
    console.log("1")

    let videoAdDelay = 5;
    let overlayAdDelay = 3;
    let nextVideoDelay = 10;

    chrome.storage.sync.get({
        videoAdDelay: 5,
        overlayAdDelay: 3,
        nextVideoDelay: 10
    }, function (config) {
        console.log("retrived config:", config)
        videoAdDelay = config.videoAdDelay;
        overlayAdDelay = config.overlayAdDelay
        nextVideoDelay = config.nextVideoDelay
        console.log(videoAdDelay, overlayAdDelay, nextVideoDelay);

        let setupStatus = {
            videoPopup: false,
            videoEnd: false,
            ad: false
        }
    
        let tmp = setInterval(function () {
            let playerContainer;
            if (window.location.pathname !== '/watch') {
                return;
            }
    
            // video automatically paused in background
            let video = document.getElementsByTagName('video')[0]
            if(video && !setupStatus.videoEnd){
                setupStatus.videoEnd = true
                video.addEventListener('ended', function (e) {
                    let endedVideo = window.location.href
                    console.log(window.location.href)
                    setTimeout(() => {
                        // console.log("check if we should go next")
                        // console.log(window.location.href)
                        if(window.location.href == endedVideo){
                            console.log("go to up next video")
                            document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > a.ytp-next-button.ytp-button").click()
                        } else {
                            console.log("already get to next")
                        }
                        
                    }, nextVideoDelay * 1000)
                });
            }
            
    
            // video has already paused popup
            popupContainer = document.querySelector("body > ytd-app > ytd-popup-container")
            if (popupContainer && !setupStatus.videoPopup) {
                setupStatus.videoPopup = true
                popupContainer.arrive("paper-dialog > yt-confirm-dialog-renderer .buttons.style-scope.yt-confirm-dialog-renderer #confirm-button paper-button", function () {
                    document.querySelector("body > ytd-app > ytd-popup-container > paper-dialog > yt-confirm-dialog-renderer .buttons.style-scope.yt-confirm-dialog-renderer #confirm-button paper-button").click()
                })
            }
    
            // ad skipper
            playerContainer = document.getElementById('player-container');
            if (playerContainer && !setupStatus.ad) {
                setupStatus.ad = true
    
                videoAd = document.querySelector("#player-container .ytp-ad-skip-button-container")
                overlayAd = document.querySelector("#player-container .ytp-ad-overlay-close-button")
    
                if (videoAd) {
                    console.log("close video Ad")
                    click(videoAd, videoAdDelay * 1000)
                }
    
                if (overlayAd) {
                    console.log("close overlay Ad")
                    click(overlayAd, overlayAdDelay * 1000)
                }
    
                playerContainer.arrive(".ytp-ad-skip-button-container", function () {
                    console.log("close video Ad")
                    click(this, overlayAdDelay * 1000);
    
                })
                playerContainer.arrive(".ytp-ad-overlay-close-button", function () {
                    console.log("close overlay Ad")
                    click(this, videoAdDelay * 1000);
                })
    
            }
    
            console.log(setupStatus)
            let setupStatusResult = true
            for(let key in setupStatus){
                setupStatusResult = setupStatusResult && setupStatus[key]
            }
            if(setupStatus){
                clearInterval(tmp);
            }
        }, 250);
    });

    function click(element, delay) {
        setTimeout(function () {
            // if (element.fireEvent) {
            //     element.fireEvent('onclick')
            // } else {
            //     let click = document.createEvent('Events');
            //     click.initEvent('click', true, false);
            //     element.dispatchEvent(click);
            // }
            console.log("fired")
            element.click()
        }, delay);
    }

})();