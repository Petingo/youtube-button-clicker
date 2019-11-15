function isValid(n){
    return !isNaN(n) && n >= 0
}
// save options when "save" button click
function saveOptions() {
    let videoAdDelay = Number(document.getElementById('videoAdDelay').value)
    let overlayAdDelay = Number(document.getElementById('overlayAdDelay').value)
    let nextVideoDelay = Number(document.getElementById('nextVideoDelay').value)

    var status = document.getElementById('status');

    if (isValid(videoAdDelay) && isValid(overlayAdDelay) && isValid(nextVideoDelay)) {
        console.log({
            videoAdDelay: videoAdDelay,
            overlayAdDelay: overlayAdDelay,
            nextVideoDelay: nextVideoDelay
        })
        chrome.storage.sync.set({
            videoAdDelay: videoAdDelay,
            overlayAdDelay: overlayAdDelay,
            nextVideoDelay: nextVideoDelay
        }, function () {
            // Update status to let user know options were saved.
            status.classList.add("mt-3")
            status.textContent = 'Saved.';
        });
    } else {
        status.classList.add("mt-3")
        // status.style.visibility = "visible";
        status.textContent = 'Invalid input';
    }
}

// Restores setting using the preferences stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({
        videoAdDelay: 5,
        overlayAdDelay: 3,
        nextVideoDelay: 10
    }, function (items) {
        document.getElementById('videoAdDelay').value = items.videoAdDelay;
        document.getElementById('overlayAdDelay').value = items.overlayAdDelay;
        document.getElementById('nextVideoDelay').value = items.nextVideoDelay;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);