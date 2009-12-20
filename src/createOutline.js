if (window == top) { /* if we loaded a parent page, show the action */
	chrome.extension.sendRequest({msg : "showAction"});
	
	/* listen to requests on this tab to generate outlines */
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		if (req.msg == "getOutline") {
			sendResponse(HTML5Outline(document.body).asHTML());
		}
	});
}