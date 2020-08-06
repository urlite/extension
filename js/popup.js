let finalUrl, numUrls;

var clipboard = new ClipboardJS('.btn');

var isFirefox = typeof InstallTrigger !== 'undefined';

if (isFirefox == true) {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        let currentUrl = tabs[0].url;
        document.getElementById('url').value = currentUrl;
    });
} else {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        let currentUrl = tabs[0].url;
        document.getElementById('url').value = currentUrl;
    });
}

demo.onclick = function (element) {
    let myUrl = document.getElementById("url").value;

    fetch(config.MY_URL, {
            method: 'post',
            body: JSON.stringify({
                url: myUrl
            })
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            finalUrl = result.shortUrl;
            numUrls = result.totalUrls;
            document.getElementById('result').value = finalUrl;
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
};