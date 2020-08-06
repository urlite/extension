var clipboard = new ClipboardJS('.btn');

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

    fetch(config.MY_URL, {
            method: 'post',
            body: JSON.stringify({
                url: p_url
            })
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            document.getElementById('result').value = result.shortUrl;
            document.getElementById("copy").click();
            document.getElementById('msg').innerHTML = "Copied!";

            document.getElementById('totalUrl').innerHTML = result.totalUrls;
        })
        .catch(function (error) {
            alert('Request failed', error);
        });
}