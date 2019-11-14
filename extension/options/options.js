// save options when "save" button click
function saveOptions() {
    let videoAdDelay = Number(document.getElementById('videoAdDelay').value)
    let overlayAdDelay = Number(document.getElementById('overlayAdDelay').value)

    var status = document.getElementById('status');

    if (!isNaN(videoAdDelay) && !isNaN(overlayAdDelay) && videoAdDelay >= 0 && overlayAdDelay >= 0) {
        console.log({
            videoAdDelay: videoAdDelay,
            overlayAdDelay: overlayAdDelay
        })
        chrome.storage.sync.set({
            videoAdDelay: videoAdDelay,
            overlayAdDelay: overlayAdDelay
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
        overlayAdDelay: 3
    }, function (items) {
        document.getElementById('videoAdDelay').value = items.videoAdDelay;
        document.getElementById('overlayAdDelay').value = items.overlayAdDelay;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);