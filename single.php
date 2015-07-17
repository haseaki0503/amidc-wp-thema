		<?php
			if (have_posts()) : while (have_posts()) : the_post();
			$type = get_field('type');
		?>

		<?php
			//画像のとき
			if($type == 'image'):
				$attachment_id = get_field('image');
				$size = "full"; // (thumbnail, medium, large, full or custom size)
				$image = wp_get_attachment_image_src( $attachment_id, $size );
				$attachment = get_post( get_field('image') );
		?>

				<img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" alt="<?php echo the_title() ?>" title="<?php echo the_title() ?>" />

		<?php endif; ?>

		<?php
			//動画のとき
			if($type == 'movie'):
			$movie = get_field('movie');
		?>
			<iframe id="vimeoPlayer" src="<?php echo $movie ?>?byline=0&portrait=0" width="1920px" height="1080px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
		<?php endif; ?>

		<div class="creater">
			<p><?php echo get_field('creater'); ?></p>
		</div>

		<?php endwhile; endif; ?>