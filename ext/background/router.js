function urlChanged(url, tabId) {
    console.log(`URL: ${url}, "TabID: ${tabId}`);
}

let router = {
    handle: (req, sender, res) => urlChanged(req.url, sender.tab.id)
}
