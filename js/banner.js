(function($) {
		$.fn.banner = function(options) {
				var defaultVal = {
					num:"4",//轮播块的大小相当于几个图片宽度
					imgWidth: "1024",
					height: "768",
					imgNum: "4",
					speed:"2000",
					prev:"#prev",
					next:"#next"//传入左右箭头的dom
				};

				var obj = $.extend(defaultVal, options);
				return this.each(function() {
					var currentObj = $(this);
					var $ul = currentObj.find("ul");
					var $li = currentObj.find("li");
					var $arrow=currentObj.find(".arrow");
					var $prev = currentObj.find(obj.prev);
					var $next = currentObj.find(obj.next);
					var $span = currentObj.find("span");
					var $num=parseInt(obj.num);
					var $width = parseInt(obj.imgWidth*$num);
					var $imgWidth=parseInt(obj.imgWidth);
					var $negWidth=-$width;
					var $negImgWidth=-$imgWidth;
					var $height = parseInt(obj.height);
					var $imgNum = parseInt(obj.imgNum);
					var $index = 1;
					var $speed=parseInt(obj.speed);
					$ul.css("margin-left",$negImgWidth);
					currentObj.css({
						"width": $width + "px",
						"height": $height + "px"
					});
					currentObj.find("img").css("height",$height);
					$li.css({
						"width":$imgWidth+"px",
						"height":$height+"px"
					});
					$ul.css({
						"width": $imgWidth * ($imgNum + $num*2) + "px",//处理一个轮播块包含好几张图片的情况
						"height": $height + "px"
					});

					function show() {
						for (var i = 0; i < $span.length; i++) {
							if ($span.eq(i).hasClass("on")) {
								$span.eq(i).removeClass("on");
							}
						}
						if ($index > $imgNum) {
							$index = 1;
						} else if ($index < 1) {
							$index = $imgNum;
						}
						$span.eq($index - 1).addClass("on");
					}

					function next() {
						$ul.animate({
							marginLeft: '-=' + $imgWidth
						}, 1000, function() {
							if (parseInt($(this).css("margin-left")) <= ($negImgWidth * $imgNum-50)) {
								$(this).css("margin-left", $negImgWidth);
							}
						});
					}
					function prev(){
							$ul.animate({
							marginLeft: '+='+$imgWidth
						}, 1000, function() {
							if (parseInt($(this).css("margin-left")) > $negImgWidth) {
								$(this).css("margin-left", $negImgWidth*$imgNum);
							}
						});
					}
					//箭头点击事件
					$next.on("click", function() {

						$index += 1;
						show();
						next();
					});
					$prev.on("click", function() {

						$index -= 1;
						show();
						prev();
					
					});
					//button点击事件
					$span.on("click", function() {

						var $i = $(this).attr("data-index");
						$ul.animate({
							marginLeft: '-=' + ($i - $index) * $imgWidth + "px"
						}, 500);
						$index = $i;
						show();
					});
					//自动播放
					var $zidong = function() {
						$index += 1;
						show();
						next();
					};
					var $an = setInterval($zidong, $speed);

					function stop(para) {
						para.hover(function() {
							clearInterval($an);
						}, function() {
							$an = setInterval($zidong,$speed);
						});
					}
					stop(currentObj);
});
}
})(jQuery);