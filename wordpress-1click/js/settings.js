var blogs = [
	{
		name : "alexw",
		url : "http://alexw.me/wp-admin"
	}
]

$(document).ready(function(){
	chrome.storage.sync.get('settings',function(obj){
		if(Object.keys(obj).length && obj.settings.length){
			blogs = obj.settings;
			console.log(obj);
		}
		populateFields();
	});
	$('#submit').on('click',addNewField);
	$('#blogs').on('click','.del',function(e){
		blogs.splice($(this).parent().attr('id'),1);
		chrome.storage.sync.set({'settings':blogs},function(){});
		return false;
	});
	$('#blogs').on('change','input',function(){
		//get the changed blog id
		var id = $(this).parent().attr('id');
		//update blogs array with changed info
		blogs[id][$(this)[0].className] = $(this).val();
		chrome.storage.sync.set({'settings':blogs},function(){});
	})
});

function populateFields(){
	$('#blogs').find('.field').remove();
	if(!blogs.length) return;
	$.each(blogs,function(i,item){
		var $temp = $('.template').eq(0).clone();
		$temp.removeClass('template').addClass('field').attr('id',i)
		.find('.name').val(item.name).end()
		.find('.url').val(item.url);
		$temp.insertAfter('#submit');
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
chrome.storage.onChanged.addListener(function(changes, namespace) {
  blogs = changes.settings.newValue;
  populateFields();
});
