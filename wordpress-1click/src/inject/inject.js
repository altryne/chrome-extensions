var overlay_html = '<div id="overlay" class="overlay">' +
		'<div id="my_awesome_iframe_container">' +
		'<iframe id="1click_iframe" width=100% height=100% frameborder=0></iframe>' +
		'</div>' +
		'</div>';

//need to get the name of the extension
var download_links = document.querySelectorAll('a[itemprop="downloadUrl"]');
if(download_links.length){
	for (var i = 0; i < download_links.length; i++) {
		var link = download_links[i];
		plugin_name = link.href.split('/').pop().split('.')[0];
		var p = document.createElement('p');
			p.innerHTML = '<a href="#">Install</a>';
			p.className = "button special-plugin-button";
			link.parentElement.insertAdjacentElement('beforebegin',p);
			p.dataset.name = plugin_name;
			p.querySelector('a').addEventListener('click',clickHandler,true);
	}
	document.querySelector('body').insertAdjacentHTML('beforeend',overlay_html);
}

function clickHandler(e){
	var plugin_name = this.parentNode.dataset.name;
	e.preventDefault();
	var iframe = document.querySelector('#my_awesome_iframe_container iframe');
		iframe.src = chrome.extension.getURL('src/page_action/page_action.html') + '?plugin_name=' + plugin_name + "#buttons";
//	setts.child = new_win(url + "/plugin-install.php?tab=plugin-information&plugin=" + plugin_name +"&TB_iframe=true&width=600&height=550",'new_win',600,550);

	document.querySelector('#overlay').classList.add('show');
	document.querySelector('#overlay').onclick = removeOverlay;
//	window.onfocus = removeOverlay;


}
function removeOverlay(){

	document.getElementById("overlay").classList.remove('show');

}
