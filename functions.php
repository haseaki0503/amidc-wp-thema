<?php

add_action('admin_menu', 'remove_menus');
function remove_menus () {
	remove_menu_page('wpcf7'); //Contact Form 7
		global $menu;
		//unset($menu[10]); // メディア
		//unset($menu[15]); // リンク
		//unset($menu[20]); // ページ
		unset($menu[25]); // コメント
	}

?>