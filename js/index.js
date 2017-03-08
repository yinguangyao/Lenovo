$(function() {
	//定义下拉菜单函数
	var dropDown = (function() {
		//动画构造函数
		function Animate(pid, cid) {
			this.pid = $(pid);
			this.cid = $(cid);
		}
		Animate.prototype.animate1 = function() {
			var that = this;
			that.pid.hover(function() {
				that.cid.slideDown(500);
			}, function() {
				that.cid.slideUp(500);
			});
		};

		return {
			init: function(p, c) {
				return new Animate(p, c);
			}
		};
	})();
	//实现下拉菜单的效果
	var test = dropDown.init("#upDown", "#contact");
	test.animate1();
	var test2 = dropDown.init(".sale", ".hot-sale");
	test2.animate1();

	//登录注册遮挡层以及输入框下拉菜单以及图片移动效果,回到顶部效果
	var shieldLayer = function() {
		var $loginButton = $(".login");
		var $regButton = $(".register");
		var $layer = $(".layer");
		var $loginDiv = $("#login");
		var $regDiv = $("#register");
		var $close1 = $("#login img");
		var $close2 = $("#register img");
		var $input = $("#searchInput");
		var $history = $(".history");
		var $floor_item=$(".floor_item img");
		var $lay=$(".moveTop .lay");
		//输入框效果
		$input.on("focus", function() {
			$history.slideDown(500);
		});
		$input.on("blur", function() {
			$history.slideUp(500);
		});
		//遮挡层效果
		$layer.css({
			"width": $("body").width(),
			"height": $("body").height()
		});
		$loginButton.on("click", function() {
			$layer.slideDown(500);
			$loginDiv.fadeIn(500);
		});
		$regButton.on("click", function() {

			$layer.slideDown(500);
			$regDiv.fadeIn(500);
		});
		$layer.on("click", function() {

			$loginDiv.fadeOut(500);
			$regDiv.fadeOut(500);
			$layer.slideUp(500);
		});
		$close1.on("click", function() {
			$layer.slideUp(500);
			$loginDiv.fadeOut(500);
		});
		$close2.on("click", function() {
			$layer.slideUp(500);
			$regDiv.fadeOut(500);
		});
		//图片效果
		$floor_item.hover(function(){
			$this=$(this);
			$this.animate({
				"marginLeft":"+=20px"
			},500);
		},function(){
			$this.animate({
				"marginLeft":"-=20px"
			},300);
		});
		
		//回到顶部
		if($("html, body").scrollTop > 10) {
			$lay.css("display", "block");
		}else {
			$lay.css("display", "none");
		}
		$lay.on("click",function(){
			
			$("html,body").animate({
				"scrollTop":"0px"
			},1000);
		});
	};
	shieldLayer();
	//广告图点击效果
	$(".ad .close").on("click", function() {
		$(this).hide();
		$(".ad img").slideUp(1000);
	});

	//引用自己写的轮播插件
	$(".img_list").banner({
		imgWidth: "770",
		num: "1",
		height: "365",
		imgNum: "4",
		prev: "#prev", //传入自定义左右箭头
		next: "#next"
	});

	//左导航的显示隐藏事件
	$(".left_nav > ul:eq(0)").find("li").each(function() {

		(function(that) {
			var $that = $(that);
			$that.hover(
				function() {
					$that.find(".lenovo-pc").show();
				},
				function() {
					$that.find(".lenovo-pc").hide();
				}
			);
		})(this);

	});

	//每日推荐小轮播
	$(".today_banner").banner({
		num: "4",
		imgWidth: "252",
		height: "159",
		imgNum: "8",
		prev: "#today_prev",
		next: "#today_next",
		speed: "3000"
	});

	//文字上下滚动效果
	var wordMarquee = (function() {
		function marquee(parent, child) {
			var r = $(parent);
			var p = $(child);
			var height = parseInt($(child).height());

			function roll() {
				r.animate({
					"marginTop": "-=" + height
				}, 3000, function() {
					if (parseInt(r.css("margin-top")) < (-height * 3)) {
						r.css("margin-top", "-" + height + "px");
					}
				});
			}

			function animate2() {
				var an = setInterval(roll, 500);
			}
			return animate2;
		}
		return {
			init: function(p, c) {
				return marquee(p, c);
			}
		}

	})();
	var wordRoll = wordMarquee.init(".roll", ".roll p:eq(0)");
	wordRoll();

	//右侧边栏的动画效果
	var sidebar = (function() {
		var a={
			$barbutton:$(".barButton"),
			$sidebar:$(".sidebar"),
			$li: $(".sidebar li"),
			showHide:function(){
				var self=this;
				self.$barbutton.on("click",function(){
					self.$barbutton.hide();
					self.$sidebar.fadeIn(1000);
				});
				self.$sidebar.on("mouseleave",function(){
					self.$sidebar.fadeOut(1000);
					self.$barbutton.show();
					
				});
				self.$sidebar.on("mouseover",function(){
					self.$li.each(function(){
						(function(that){
							var $that=$(that);
							$that.hover(function(){
								$that.find(".phone").show();
								$that.find("a").show();
							},function(){
								$that.find(".phone").hide();
								$that.find("a").hide();
							});
						})(this);
					});
				});
			}
		};
		return{
		init:function(){
			return a;
		}
		};
	})();
	var side=sidebar.init();
	side.showHide();
  
  //点击不同楼层跳转到当前对应的块
  var move=(function(){
  	var judge={
  		 $left_bar:$(".left_sidebar"),
  		 $li:$(".left_sidebar li"),
  		 appear:function(){
  		 	var that=this;
  		 	$(window).scroll(function(){
  		 		that.$left_bar.show(1000);
  		 	});
  		 },
  		 select:function(){
  		 	
  		 		this.$li.each(function(index){
  		 			(function(self,i){
  		 			var $this=$(self);
  		 			var j=i+1;
  		 			var $floor=$("#F"+j);
  		 		$this.on("click",function(){
  		 			
  		 			$("body,html").animate({
  		 				"scrollTop":$floor.offset().top+"px"
  		 			},1000);
  		 		});
  		 	})(this,index);
  		 	});
  		 	
  		 },
  		 
  	};
  	return{
  		init:function(){
  			judge.appear();
  			judge.select();
  		}
  	};
  	 
  })();
  var moveTo=move.init;
  moveTo();
  $(".loading").css("height",$(window).height());
  $(".container").load(function(){
  	$(".loading").hide();
  });
});
