//window.setTimeout()
var pages = ['main_page','peek_page','story_page'];
var cur_page = 0;
var last_page = pages.length  - 1;
var page_height = $(window).height();
var ele = $('#' + pages[1]);
var trans_flag = false;
console.log('cp:: ',cur_page);


// this detects the end of the transition to eliminate scrolling/bounceback issues
$(".page").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
console.log('transit');
	trans_flag = false;
	cur_page = 0;  // skip the home page, make it the default
	for (var i = 1; i < pages.length; i++) {
		if($('#' + pages[i]).hasClass('show')) {
			cur_page = i;
		}
	};
});

$('#zmenu a, #zmenu li a').click(function(){
	var new_page = 0;
	console.log($(this).attr('href'));
	// first, find the index of the page you're going to
	for (var i = 1; i < pages.length; i++) {
		if('#' + pages[i] == $(this).attr('href')) {
			new_page = i;
		}
	}
	// going back, just remove the class 'show'
	if(new_page < cur_page){
		for (i=cur_page; i > new_page; i--) {
			$('#' + pages[i]).removeClass('show');
		};
	// going forward, add the class 'show'
	} else if(new_page > cur_page) {
		for (i=cur_page; i <= new_page; i++) {
			$('#' + pages[i]).addClass('show');
		};
	}
	cur_page = new_page;
	return false;
});

// this handles the page transitions via  scrolling
var lastScrollTop = 0;
$(window).scroll(function(event){
	if(!trans_flag){
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
		   // downscroll code
			if(st > lastScrollTop){
console.log('v-st: ',st);
				if(cur_page < last_page){
					$('#' + pages[cur_page + 1]).addClass('show');
//					$('#' + pages[cur_page]).removeClass('show');
					trans_flag = true;
				}
			}
		} else if(st < lastScrollTop) {
		  // upscroll code
console.log('^-st: ',st);
			if(cur_page > 0){
					trans_flag = true;
				$('#' + pages[cur_page]).removeClass('show');
			}
		}
		lastScrollTop = st;
	}
});


// slideshow
$(function() {
	$('#slides').slidesjs({
		width: 400,
		height: 300,
		navigation: {
			active: false,
			effect: "fade"
		},
		pagination: {
			effect: "fade"
		},
		effect: {
			fade: {
				speed: 400
			}
		},
		callback: {
			loaded: function(number) {
				$(".slidesjs-container").css("height", '300');
			}
		}
	});
});

// window.onresize = function(event) {
// 	page_height = $(window).height();
// };

// $('#tour').click(function(e){
// 	$('#peek_page').addClass('show');
// });

// $(function(){
// 	for (var i = 0; i < pages.length; i++) {
// 		$('#' + pages[i]).removeClass('hide');
// 	};


// 		var top = ele[0].getBoundingClientRect().top;
//  		if(top > 0 && top < 150) {
//  			ele.css({'position':'fixed','top':'0px'});
//  			cur_page = (curpage + 1) % 3;
// 			var ele = $('#' + pages[cur_page + 1]);
//  		}

// 	$('#x').text("page: " + pages[cur_page + 1] + "    curpage: " + cur_page + "     page height: " + page_height + "     el: " + ele_offset + "      this: " +$(this).scrollTop() + '   : ' + ele.css('position'));
// 		if (ele_offset > (page_height -150) && ele.css('position') != 'fixed'){
// 			$('#' + pages[cur_page + 1]).css({'position': 'fixed', 'top': '0px'});
// 	console.log('burp');
// //			cur_page = (cur_page + 1) % 3;
// 		} else if (ele_offset < page_height - 150 && ele.css('position') == 'fixed') {
// 			$('#' + pages[cur_page + 1]).css({'position': 'static', 'top': '0px'});
// 	})



// });
