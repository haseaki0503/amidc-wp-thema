<?php get_header(); ?>
<script type="text/javascript">
	$(function(){
		showLogo();
	});
</script>

<body>
	<header>
		<img id="logo" src="<?php echo get_template_directory_uri(); ?>/img/logo.png">
		<aside>
			<noscript>お使いのブラウザのJavaScriptを有効にしてください。</noscript>
		</aside>
	</header>
	<aside>
		<div class="bg"></div>
		<img class="close" src="<?php echo get_template_directory_uri(); ?>/img/close.png">
	</aside>

	<article>
		<div class="modal"></div>
		<div class="loading">
			<img src="<?php echo get_template_directory_uri(); ?>/img/loading.gif">
		</div>

		<address>
			<iframe id="vimeoPlayer" src="http://player.vimeo.com/video/127211217?byline=0&portrait=0" width="1920px" height="1080px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			<div id="information">
				<h1 style="text-align: center;">愛知工業大学名電高等学校<br>情報デザイン部</h1>
				<p style="text-align: center;">mail:<a href="mailto:info@meidenid.com">info@meidenid.com</a></p>
			</div>
		</address>
	</article>

	<div class="iconMenu">
			<div class="icon">
				<img class="out" src="<?php echo get_template_directory_uri(); ?>/img/icon.png">
				<img class="over" src="<?php echo get_template_directory_uri(); ?>/img/icon.gif">
			</div>
	</div>

	<div style="clear:both;"></div>

	<nav class="mainMenu">
		<?php
			if (have_posts()) : while (have_posts()) : the_post();

			$attachment_id = get_field('thumbnail');
			$size = "full"; // (thumbnail, medium, large, full or custom size)
			$image = wp_get_attachment_image_src( $attachment_id, $size );
			$attachment = get_post( get_field('thumbnail') );

		?>

			<section class="menu">
				<a href="<?php the_permalink() ?>"></a>
				<img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" alt="<?php echo the_title() ?>" title="<?php echo the_title() ?>" />
			</section>

		<?php endwhile; endif; ?>

	</nav>

<?php get_footer(); ?>