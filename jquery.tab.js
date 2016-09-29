;
(function($,window,document,undefined){

	var pluginName = 'tab',
		defaults = {
			tab:'tab',
			content:'content',
			activeClass:'active',
			hoverClass:'hover',
			active:0
		};

	function Tab(options){
		this.settings = $.extend({},defaults,options);
		this.init();
	}

	function addDot(string){
		return '.'+string;
	}

	Tab.prototype = {
		init:function(){
			var that = this,
				tab = $(addDot(that.settings.tab)),
				tabs = $(addDot(that.settings.tabs));
				tabNum = tab.length,
				content = $(addDot(that.settings.content));
			that.showTab(tab,content,that.settings.active,that);
			$(document).on('keydown',function(e){
				e.preventDefault();
				if(e.keyCode == 9){
					var currentIndex = tab.filter('.active').index();
					that.hideActive(tab,content,currentIndex,that);
					var showIndex = (currentIndex + 1 >= tabNum) ? that.settings.active : currentIndex + 1;
					that.showTab(tab,content,showIndex,that);
				}
			});
			$(document).on('click',addDot(that.settings.tab),function(){
				tab.removeClass(that.settings.activeClass);
				content.hide();
				that.showTab(tab,content,tab.index(this),that);
			});
			$(addDot(that.settings.tab)).hover(
				function(){
					$(this).addClass(that.settings.hoverClass);
				},
				function(){
					$(this).removeClass(that.settings.hoverClass);
				}
			);
		},
		hideActive:function(tab,content,current,that){
			tab.eq(current).removeClass(that.settings.activeClass);
			content.eq(current).hide();
		},
		showTab:function(tab,content,index,that){
			tab.eq(index).addClass(that.settings.activeClass);
			content.eq(index).show();
		}
	}

	$.fn[pluginName] = function(options){
		this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this,'plugin_'+pluginName,new Tab(options));

			}
		});

		return this;
	}
})(jQuery,window,document);