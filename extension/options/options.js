// save options when "save" button click
function save_options() {
    let videoAdDelay = document.getElementById('videoAdDelay').value;
    let overlayAdDelay = document.getElementById('overlayAdDelay').value;

    var status = document.getElementById('status');

    if (!isNaN(videoAdDelay) && !isNaN(overlayAdDelay) && videoAdDelay >= 0 && overlayAdDelay >= 0) {
        chrome.storage.sync.set({
            videoAdDelay: videoAdDelay,
            overlayAdDelay: overlayAdDelay
        }, function () {
            // Update status to let user know options were saved.
            status.textContent = 'Saved.';
        });
    } else {
        status.textContent = 'Invalid input';
    }
}

// Restores setting using the preferences stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        videoAdDelay: 5,
        overlayAdDelay: 3
    }, function (items) {
        document.getElementById('videoAdDelay').value = items.videoAdDelay;
        document.getElementById('overlayAdDelay').value = items.overlayAdDelay;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);