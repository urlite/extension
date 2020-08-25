btn();
wich_browser();

function wich_browser() {

    var isFirefox = typeof InstallTrigger !== 'undefined';

    if (isFirefox == true) {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            request(tabs[0].url);
        });
    } else {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, tabs => {
            request(tabs[0].url);
        });
    }
}

// Call API 
function request(p_url) {

    fetch(config.API_URL, {
            method: 'POST',
            headers: {
                'x-api-key': config.API_KEY,
            },
            body: JSON.stringify({
                url: p_url
            })
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            document.getElementById('result').value = result.shortUrl;

            copyToClipboard();

            document.getElementById('msg').innerHTML = "Copied!";

            document.getElementById('totalUrl').innerHTML = result.totalUrls;
        })
        .catch(function (error) {
            alert('Request failed', error);
        });
}

function copyToClipboard() {

    var res = document.getElementById("result").value;

    navigator.clipboard.writeText(res)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            // This can happen if the user denies clipboard permissions:
            console.error('Could not copy text: ', err);
        });
}

function btn() {
    var btnCopy = document.getElementById('btn');
    btnCopy.addEventListener('click', function () {
        copyToClipboard();
    });
}