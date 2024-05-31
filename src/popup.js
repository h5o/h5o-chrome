chrome.tabs.query({ currentWindow: true, active: true }).then(function ([tab]) {

    chrome.tabs.sendMessage(tab.id, { msg: "getOutline" }, function (outline) {
        var elOutline = document.getElementById('outline');
        elOutline.innerHTML = outline;

        var links = elOutline.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = function (e) {
                var lnk = e.target;
                while (lnk.nodeName != 'A' && lnk) lnk = lnk.parentNode;

                e.preventDefault();
                var id = lnk.href.substring(lnk.href.indexOf('#') + 1);
                chrome.tabs.sendMessage(tab.id, { msg: "jumpTo", id: id });
            }
        }
    });
});
