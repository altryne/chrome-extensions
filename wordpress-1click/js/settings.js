var blogs = [
	{
		name : "demo-blog",
		url : "http://demo-blog.me/wp-admin"
	}
]

$(document).ready(function(){
	//detect if we're in iframe mode
	loc = window.location.search.substr(1);
	if(loc.split("=").length){
		//set the page to "buttons" mode
		window.location.hash = "buttons";
		//save the plugin name from query params
		plugin_name = loc.split('=')[1];
		$('.plugin_name').text('"' + plugin_name + '"');

	}
	chrome.storage.sync.get('settings',function(obj){
		if(Object.keys(obj).length && obj.settings.length){
			blogs = obj.settings;
		}
		populateFields();
	});
	$('#submit').on('click',addNewField);
	$('#blogs').on('click','.del',function(e){
		blogs.splice($(this).parent().attr('id'),1);
		chrome.storage.sync.set({'settings':blogs},function(){});
		return false;
	});
	$('#blog_buttons').on('click','.install',function(e){
		e.preventDefault();
		win = new_win(this.href + "/plugin-install.php?tab=plugin-information&plugin=" + plugin_name +"&TB_iframe=true&width=600&height=550",this.textContent,600,550);
	})
	$('#blogs').on('change','input',function(){
		//get the changed blog id
		var id = $(this).parent().attr('id');
		//update blogs array with changed info
		blogs[id][$(this)[0].className] = $(this).val();
		chrome.storage.sync.set({'settings':blogs},function(){});
	})
});

function populateFields(){
	if(!blogs.length) return;
	$('#blogs').find('.field').remove();
	$('#blog_buttons').empty();
	$.each(blogs,function(i,item){
		var $temp = $('.template').eq(0).clone();
			$temp.removeClass('template').addClass('field').attr('id',i)
			.find('.name').val(item.name).end()
			.find('.url').val(item.url);
		$('#blogs').append($temp);
		var $temp_btn = $('.template2').eq(0).clone();
			$temp_btn.removeClass('template2')
			.attr('data-name',item.name)
			.attr('href',item.url);
		$('#blog_buttons').append($temp_btn);
	});
}
function addNewField(e){
	e.preventDefault();
	blogs.push({
		name : "",
		url : ""
	})
	chrome.storage.sync.set({'settings':blogs},function(){

	});
	return false;
}

function new_win(mypage, myname, w, h, scroll, pos) {
	leftPos = (screen.availWidth) ? (screen.availWidth - w) / 2 : 50;
	topPos = (screen.availHeight) ? (screen.availHeight - h) / 2 : 50;
	settings = 'width=' + w + ',height=' + h + ',top=' + topPos + ',left=' + leftPos + ',scrollbars=' + scroll + ',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
	var something = window.open(mypage, myname, settings);
	return something;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  blogs = changes.settings.newValue;
  populateFields();
});
