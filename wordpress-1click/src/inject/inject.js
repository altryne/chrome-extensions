chrome.extension.sendMessage({}, function(response) {

});

var url = 'http://alexw.me/wp-admin';
var setts = {};

//need to get the name of the extension
var download_links = document.querySelectorAll('a[itemprop="downloadUrl"]');
	if(download_links.length){
		console.log('got some buttons!!',download_links);
		for (var i = 0; i < download_links.length; i++) {
			var link = download_links[i];
			var plugin_name = link.href.split('/').pop().split('.')[0];
			var p = document.createElement('p');
			p.innerHTML = '<a href="#">Install</a>';
			p.className = "button special-plugin-button";
			link.parentElement.insertAdjacentElement('beforebegin',p);
			p.dataset.name = plugin_name;
			p.querySelector('a').addEventListener('click',clickHandler,true);
		}
	}

function clickHandler(e){
	var plugin_name = this.parentNode.dataset.name;
	e.preventDefault();
	setts.child = new_win(url + "/plugin-install.php?tab=plugin-information&plugin=" + plugin_name +"&TB_iframe=true&width=600&height=550",'new_win',600,550);

	var overlay = document.createElement("div");
		overlay.setAttribute("id","overlay");
		overlay.setAttribute("class", "overlay");
		document.body.appendChild(overlay);

	window.onfocus = removeOverlay;


}
function removeOverlay(){
	
	document.body.removeChild(document.getElementById("overlay"));

}

function new_win(mypage, myname, w, h, scroll, pos) {


		LeftPosition = (screen.availWidth) ? (screen.availWidth - w) / 2 : 50;
		TopPosition = (screen.availHeight) ? (screen.availHeight - h) / 2 : 50;

		settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
		var something = window.open(mypage, myname, settings);
		return something;
}
