<?php get_header(); ?>
<script type="text/javascript">
	$(function(){
		showLogo();
	});
</script>

<body>
	<header>
		<img id="logo" src="<?php echo get_template_directory_uri(); ?>/img/logo_cursive.png">
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
			<div id="information">
				<?php
					$page = get_page_by_path('contact');
			    if( isset( $page ) ) {
			        echo apply_filters( 'the_content', $page->post_content );
			    }
				?>
			</div>
		</address>
	</article>

	<nav id="navbar">
		<ul>
			<li class="about">About</li>
			<li class="contact">Contact</li>
		</ul>
	</nav>

	<div id="head-logo">
		<img src="<?php echo get_template_directory_uri(); ?>/img/logo_top.png">
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

	<div class="prev-next">
		<?php next_posts_link('more'); ?>
	</div>

<?php get_footer(); ?>
