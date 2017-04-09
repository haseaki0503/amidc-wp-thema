$(window).load(function(){

	hideLogo();
	arrangeBoxes();

	window.setTimeout("preShowModals(0)", 2000);

	$('.menu').bind("click", preShowModals);
	$('.contact').bind("click", showInfo);

	//リロード時、最上部へ移動
	$('html,body').animate({ scrollTop: 0 }, '1');

	//リサイズ時にボックスの配置をやり直す
	$(window).bind("resize", arrangeBoxes);

	$(".prev-next").bind("click", arrangeBoxes);


	//右上のAMIDCロゴの設定
	$(".over").hide();
	$(".out, .over").hover(
		function(){
			$(".out").hide();
			$(".over").show();
		},
		function(){
			$(".out").show();
			$(".over").hide();
		}
	);

});

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

	function preShowModals (flag, event) {

		console.log(event);

		modal = $(".modal");

		if (flag === 0) {
			if (location.hash) {
				modalHash = location.hash.substring(1, location.hash.length);
				modalURL = 'http://' + location.host + '/?p=' + modalHash;
				showModals(modalURL, modalHash);
			} else {
				return false;
			}
		} else {
			modalURL = $(this).children("a").attr('href');
			modalHash = modalURL.replace("http://meidenid.com/?p=","");
			showModals(modalURL, modalHash);
		};

		//google analytics
		ga('send', 'pageview', {
 			'page': location.pathname + location.search  + location.hash
		});

	};

	function showModals(modalURL, modalHash){

		//hash追加
		location.hash = modalHash;

		//ウィンドウサイズ取得
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();

		//背景表示
		$(".bg").fadeIn(500);

		//ロード画像のプリロード
		$("<img>").attr("src", "http://meidenid.com/wp-content/themes/mid/img/loading.gif" );

		//ロード
		modal.load(modalURL,
			function(){

				modal.css({
					top: $(window).scrollTop() + winHeight * 0.1 + "px",
				});

				//ローディング画像表示
				$('.loading').css({
					"top": $(window).scrollTop() + winHeight / 2 - 12 + "px"
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
					movie.bind("load", function(){
					$('.loading').hide();
						modal.fadeIn(500);
					});
				};

				if (image.get(0)) {
					image.css({
					"max-width": winWidth * 0.8 + "px",
					"max-height": winHeight * 0.8 + "px"
					});
					image.bind("load", function(){
						$('.loading').hide();
						modal.fadeIn(500);
					});
				};

				//閉じるボタン表示
				$('.close').show().unbind();

				//モーダル非表示
				$('.modal, .close, .bg').click(function() {
					modal.fadeOut(500);
					$('.bg').hide();
					$('.close').hide();
					$('.loading').hide();

					//再生停止
					if (movie.get(0)){
						$f(document.getElementById('vimeoPlayer')).api('unload');
					};

					//hash削除
					location.hash='';
				});

			});
	};

	function showInfo(){

		var movie = $('address').children('iframe');
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();

		//背景表示
		$(".bg").show();

		//データ表示
		$('address').fadeIn(500);
		movie.css({
			"width": winWidth * 0.7,
			"height": winWidth * 0.7 * 0.563
		});

		$('.close').show();

		//モーダル非表示
		$("#information").bind("click", function() {
			return false;
		});
		$(".close, .bg, address").click(function(event) {
			$('address').hide();
			$(".bg").fadeOut(500);
			$('.close').fadeOut(500);
			$f(document.getElementById('vimeoPlayer')).api('unload');
		});

	};
