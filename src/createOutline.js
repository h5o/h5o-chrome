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
				location.href = '#'+req.id;
				highlight(req.id);
				break;
		}
	});
	
	var highlight = function(id)
	{
		var el = document.getElementById(id);
		alert(id);
		var currentOpacity = window.getComputedStyle(el).opacity;
		
		var duration=200, 
			itr=0;
		el.style.webkitTransitionProperty="opacity";
		el.style.webkitTransitionDuration=duration+"ms"
		el.style.webkitTransitionTimingFunction="ease";
		var blink = function()
		{
			el.style.opacity = (itr % 2 == 0 ? 0 : currentOpacity);
			if (itr < 3) {
				itr++;
				setTimeout(blink, duration);
			}
		}
		blink();
	}
}