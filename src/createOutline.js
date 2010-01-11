if (window == top) { /* if we loaded a parent page, show the action */
	chrome.extension.sendRequest({msg : "showAction"});
	
	/* listen to requests on this tab to generate outlines */
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		switch (req.msg) {
			case "getOutline":
				var outline = HTML5Outline(document.body);
				sendResponse(outline ? outline.asHTML(true) : "No outline - is there a FRAMESET?");
				break;
			
			case "jumpTo":
				location.href = req.hash;
				break;
		}
	});
}