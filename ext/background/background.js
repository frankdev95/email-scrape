chrome.webRequest.onBeforeRequest.addListener(e => {
    if(e.url.includes('search/people')) return storage.set(e.tabId, {
        url: e.url,
        type: "web-app"
    });
}, {urls: ["*://www.linkedin.com/*/*"]});

chrome.runtime.onMessage.addListener((req, sender, res) => {
    if(req.url) router.handle(req, sender, res);
});
