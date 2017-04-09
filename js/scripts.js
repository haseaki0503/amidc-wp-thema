scroll = 0;

$(window).load(function(){

	// infinit(WordPress-plugin)
	$('a#next').click(function(){
		$(document).trigger('retrieve.infscr');
		return false;
	});

	//ロゴの表示、最上部へ移動
	hideLogo();
	init();

	arrangeBoxes();

	//リサイズ時にボックスの配置をやり直す
	$(window).bind("resize", arrangeBoxes);

	window.setTimeout("preShowModals(0)", 2000);

});

function init(){
	// ずれるので2回arrange
	arrangeBoxes();
	setTimeout(function() {
		arrangeBoxes();
	}, 100);

	$('.menu').on('click', showModals);
	$('.contact').bind("click", showInfo);
}

function arrangeBoxes(){
		//ウィンドウサイズ取得
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();

		//コンテンツボックスのサイズ設定
		var noBox = Math.floor(winWidth / 180);
		if(noBox < 3){
			noBox = 3;
		}
		var navPadding = winWidth * 0.25
		var contentBoxWidth = 100 / noBox

		$(".menu").css({
			"width": contentBoxWidth + "%",
			"height": contentBoxWidth + "%",
			"margin-right": 0,
			"margin-bottom": 0
		});

		$("nav.mainMenu").css({
			"margin-left": navPadding / 2 + "px",
			"margin-right": navPadding / 2 + "px"
		});

		//列最後のボックスのマージン調整
		$(".menu:nth-child(" + noBox + "n)").css({
			"margin-right": 0,
		});

	}


	function showLogo(){
		//ウィンドウサイズ取得
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();

		//ロゴサイズ設定
		if(winWidth < winHeight){
			var logoWidth = winWidth * 0.5;
			//var logoHeight = "auto";
		} else {
			//var logoWidth = "auto";
			var logoHeight = winHeight * 0.1;
		}

		$("#logo").css({
			"width": logoWidth,
			"height": logoHeight,
		});
		$("#logo").css({
			"left": ($("header").width() - $("#logo").width()) / 2,
			"top": ($("header").height() - $("#logo").height()) / 2,
		});

		//フェードイン
		$("#logo").fadeIn(800);

	};

	function hideLogo() {
		setTimeout(function(){
			$("#logo").fadeOut(500, function(){
				$("header").hide();
				showContent();
			});
		}, 700);
	}

	function showContent(){
		//コンテンツを1つずつ表示
		$('.menu')
			.css({opacity: 0})
			.each(function(i){
				$(this).delay(100 * i).animate({opacity:1}, 800);
			});
	};

	/*********************
	* モーダルの表示
	**********************/
	function showModals(flag){

		modal = $(".modal");

		//hash追加
		if (location.hash && flag === 0) {
			modalHash = location.hash.substring(1, location.hash.length);
			modalURL = 'http://' + location.host + '/?p=' + modalHash;
		} else {
			modalURL = $(this).children("a").attr('href');
			modalHash = modalURL.replace("http://"+ location.host + "/?p=","");
		}
		location.hash = modalHash;

		//google analytics
		ga('send', 'pageview', {
 			'page': location.pathname + location.search  + location.hash
		});

		//ウィンドウサイズ, スクロール位置取得
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();
		scroll = $(window).scrollTop();

		//メニューをunbind
		$('.menu').off('click');
		$('.icon').off("click");

		//背景表示
		$(".bg").fadeIn(500);

		//ロード画像のプリロード
		$("<img>").attr("src", "http://"+ location.host +"/wp-content/themes/mid/img/loading.gif" );

		//ロード
		modal.load(modalURL,
			function(){

				modal.css({
					top: scroll + winHeight * 0.1 + "px",
				});

				//ローディング画像表示
				$('.loading').css({
					"top": scroll + winHeight / 2 - 12 + "px"
				});

				if (winWidth > winHeight) {
					$('.loading > img').css({
						"width": winWidth * 0.05 + "px"
					});
				} else {
					$('.loading > img').css({
						"height": winHeight * 0.05 + "px"
					});
				};

				$('.loading').show();

				//モーダル表示
				var movie = modal.children('iframe');
				var image = modal.children('img');

				if(movie.get(0)) {
					movie.css({
					"width": winWidth * 0.7,
					"height": winWidth * 0.7 * 0.563
					});
					movie.on("load", function(){
					$('.loading').hide();
						modal.fadeIn(500);
					});
				};

				if (image.get(0)) {
					image.css({
					"max-width": winWidth * 0.8 + "px",
					"max-height": winHeight * 0.8 + "px"
					});
					image.on("load", function(){
						$('.loading').hide();
						modal.fadeIn(500);
					});
				};

				//閉じるボタン表示してbind
				$('.close').show();
				$('.modal, .close, .bg').on('click', hideModals);

			});
	};

	function hideModals(){
		modal.hide();
		$('.bg').hide();
		$('.close').hide();
		$('.loading').hide();

		//再生停止
		$f(document.getElementById('vimeoPlayer')).api('unload');

		//メニューをbind
		$('.menu').on('click', showModals);
		$('.icon').on("click", showInfo);

		//unbind
		$('.modal, .close, .bg').off('click', hideModals);

		//hash削除
		location.hash='';

		//元の位置にスクロール
		$(window).scrollTop(scroll);
	}


	/*********************
	* Information の表示
	**********************/
	function showInfo(){

		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();
		var scroll = $(window).scrollTop();

		//メニューをunbind
		$('.menu').off('click');

		//背景表示
		$(".bg").show();

		//データ表示
		$('address').fadeIn(500);
		$('.close').show();

		//モーダル非表示
		$("#information").bind("click", function() {
			return false;
		});
		$(".close, .bg, address").click(function(event) {
			$('address').hide();
			$(".bg").hide();
			$('.close').hide();
		});

		//メニューをbind
		$('.menu').on('click', showModals);

		//元の位置にスクロール
		$(window).scrollTop(scroll);

	};
