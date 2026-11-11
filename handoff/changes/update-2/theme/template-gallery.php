<?php
/**
 * Template Name: Gallery
 *
 * Lake Forest Motor Sports · the Gallery page (update 2, 11 November 2026).
 * Markup is the reference build's, one to one: https://sigovs.github.io/LAKE-FOREST/handoff/site/gallery.html
 * The photographs and categories come from wp-admin → Gallery (inc/gallery.php). Follow the structure of
 * template-rpm.php for anything theme-specific around <main> (header, footer, wrappers).
 */

get_header();

$photos = new WP_Query([
	'post_type'      => 'lfms_photo',
	'post_status'    => 'publish',
	'posts_per_page' => -1,
	'orderby'        => 'date',
	'order'          => 'DESC',   // newest first; a photograph moves by changing its publish date
	'no_found_rows'  => true,
]);

/* only categories that hold a published photograph, the fullest first */
$terms = get_terms([
	'taxonomy'   => 'lfms_photo_category',
	'hide_empty' => true,
	'orderby'    => 'count',
	'order'      => 'DESC',
]);
if (is_wp_error($terms)) {
	$terms = [];
}
?>
<main id="top" class="gx-main">
<script>document.documentElement.classList.add('js');</script>

<section class="gx-hero" aria-labelledby="h-gallery">
  <div class="gx-hero__words">
    <p class="eyebrow">The archive</p>
    <h1 id="h-gallery" class="cp-hero__title">Gallery.<span class="hero__sub">Photographs of the family’s cars, races and dealership.</span></h1>
  </div>
</section>

<section class="gx-wrap" id="photos" aria-label="Photographs" tabindex="-1">
  <nav class="gx-filter" aria-label="Photographs by category">
    <div class="gx-filter__track">
      <ul>
        <li><button type="button" data-filter="all" aria-pressed="true">All<span class="gx-filter__n"><?php echo (int) $photos->post_count; ?></span></button></li>
<?php foreach ($terms as $term) : ?>
        <li><button type="button" data-filter="<?php echo esc_attr($term->slug); ?>" aria-pressed="false"><?php echo esc_html($term->name); ?><span class="gx-filter__n"><?php echo (int) $term->count; ?></span></button></li>
<?php endforeach; ?>
      </ul>
    </div>
  </nav>
  <p class="visually-hidden" aria-live="polite" data-gx-status></p>
  <ul class="gx" data-gx>
<?php
$i = 0;
while ($photos->have_posts()) :
	$photos->the_post();
	$img_id = get_post_thumbnail_id();
	if (!$img_id) {
		continue;   // a photo entry without its photograph is skipped
	}
	$tile = wp_get_attachment_image_src($img_id, 'lfms-gallery-tile');
	$full = wp_get_attachment_image_src($img_id, 'lfms-gallery-full');
	if (!$tile || !$full || !$tile[2]) {
		continue;
	}
	$caption = get_the_title();
	$alt     = trim((string) get_post_meta($img_id, '_wp_attachment_image_alt', true));
	$alt     = $alt !== '' ? $alt : $caption;
	$cats    = wp_get_post_terms(get_the_ID(), 'lfms_photo_category', ['fields' => 'slugs']);
	$cats    = is_wp_error($cats) ? [] : $cats;
	$ratio   = round($tile[1] / $tile[2], 4);
	$lazy    = $i < 3 ? '' : ' loading="lazy"';
	$i++;
?>
      <li class="gx__item" id="photo-<?php echo esc_attr(get_post_field('post_name')); ?>" data-cat="<?php echo esc_attr(implode(' ', $cats)); ?>" style="--r: <?php echo esc_attr($ratio); ?>">
        <figure>
          <a class="gx__open" href="<?php echo esc_url($full[0]); ?>" data-w="<?php echo (int) $full[1]; ?>" data-h="<?php echo (int) $full[2]; ?>"><img src="<?php echo esc_url($tile[0]); ?>" width="<?php echo (int) $tile[1]; ?>" height="<?php echo (int) $tile[2]; ?>"<?php echo $lazy; ?> decoding="async" alt="<?php echo esc_attr($alt); ?>"></a>
          <figcaption class="caption"><?php echo esc_html($caption); ?></figcaption>
        </figure>
      </li>
<?php
endwhile;
wp_reset_postdata();
?>
  </ul>
  <p class="gx-more" hidden><button class="pill pill--line" type="button" data-gx-more>Show more photographs</button></p>
</section>

</main>
<?php
get_footer();
