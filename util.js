function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomRefresh(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	var rand = Math.floor(Math.random() * (max - min)) + min;
	console.log('Refresh dans ' + rand + ' minutes');
	setTimeout(function(){ location.reload(); }, rand*60*1000);
}
function playSound(){
	var player = document.createElement('audio');
	player.src = 'https://proxy.notificationsounds.com/notification-sounds/coins-497/download/file-sounds-869-coins.mp3';
	player.preload = 'auto';
	player.play();
}

/**
* Waits for an element satisfying selector to exist, then resolves promise with the element.
* Useful for resolving race conditions.
*
* @param selector
* @returns {Promise}
*/
async function elementReady(selector) {
	return new Promise((resolve, reject) => {
		let el = document.querySelector(selector);
		if (el) {resolve(el);}
		new MutationObserver((mutationRecords, observer) => {
			// Query for elements matching the specified selector
			Array.from(document.querySelectorAll(selector)).forEach((element) => {
				resolve(element);
				//Once we have resolved we don't need the observer anymore.
				observer.disconnect();
			});
		})
			.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
	});
}