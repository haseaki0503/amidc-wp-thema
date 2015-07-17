<?php if (have_posts()) :
	while (have_posts()) : the_post(); ?>
		<div class="infoPage">
			<?php the_content(); ?>
		</div>
	<?php endwhile; ?>
	<?php else : ?>
<?php endif; ?>
