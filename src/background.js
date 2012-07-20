chrome.extension.onRequest.addListener(function(request, sender) 
{
	if (request.msg == "showAction") {
		chrome.pageAction.show(sender.tab.id);
	}
});