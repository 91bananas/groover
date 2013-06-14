function checkForValidUrl(tabId, some_unused_parameter, tab) {
	if (tab.url.indexOf('grooveshark.com') > -1) {
		chrome.pageAction.show(tabId);
		chrome.tabs.executeScript(null, {file: "app.js"});
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);