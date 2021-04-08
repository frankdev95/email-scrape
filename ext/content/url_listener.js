let currentUrl = window.location.href, currentPath = window.location.pathname;

function onUrlChange() {
    chrome.runtime.sendMessage({url: currentUrl});
}

window.addEventListener('popstate', e => {
    console.log(e.state);
});

onUrlChange();

urlChecker = {
    interval: setInterval(_ => {
        let oldUrl = currentUrl, oldPath = currentPath;
        this.currentUrl =  window.location.href, this.currentPath = window.location.pathname;
        let html = document.querySelector('html').innerHTML;
        let title = document.querySelector('title').innerHTML;

        let pageRegex = new RegExp(/&page=[0-9]+/gi);

        // remove the part of the url which shows the page number you are currently on
        let parsedOldUrl = oldUrl.replace(pageRegex, "");
        let parsedCurrentUrl = this.currentUrl.replace(pageRegex, "");

        if(this.currentUrl.includes("search/results")) {
            if(!this.currentUrl.includes("&page=")) {
                this.currentUrl = this.currentUrl.replace("keywords=&", "");
                window.history.pushState({
                    html: html,
                    title: title
                }, "", this.currentUrl + "&page=1");
            } else if(this.currentUrl.includes("&page=")) {
                let [page] = this.currentUrl.match(pageRegex); // gets the page and number

                if(this.currentUrl.substring(this.currentUrl.length - page.length) !== page) {
                    this.currentUrl = page = this.currentUrl.replace("&" + page, "") + "&" + page;
                    window.history.pushState({
                        html: html,
                        title: title
                    }, "", this.currentUrl);
                }
            }
        }

        if(parsedOldUrl !== parsedCurrentUrl) {
            currentUrl = window.location.href;
            onUrlChange();
        }
    }, 500)
}
