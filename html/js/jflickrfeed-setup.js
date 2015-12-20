
$(document).ready(function(){
	
	$('#basicuse').jflickrfeed({
		limit: 9,
		qstrings: {
			//id: '8779163@N06' my id //
			id: '52617155@N08'
		},
		itemTemplate: '<li><a data-rel="prettyPhoto" title="{{title}}" href="{{image_b}}"><i class="fa fa-search"></i><div class="hover"></div></a><img src="{{image_s}}" alt="{{title}}" /></li>'
	});

});
