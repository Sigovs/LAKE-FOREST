<?php
/**
 * Lake Forest Motor Sports · Gallery (update 2, 11 November 2026).
 *
 * The family adds and edits the gallery themselves in wp-admin:
 *   Gallery → Add photo: the caption is the title, the photograph is the featured image (its "Alternative Text"
 *   describes it for screen readers), the category is ticked on the right. Newest first; to move a photograph,
 *   change its publish date. Categories are edited under Gallery → Categories.
 *
 * Include from functions.php:  require_once get_template_directory() . '/inc/gallery.php';
 */

if (!defined('ABSPATH')) {
	exit;
}

/* the photographs and their categories: admin only, no public single pages or archives */
add_action('init', function () {
	register_post_type('lfms_photo', [
		'labels' => [
			'name'               => 'Gallery',
			'singular_name'      => 'Photo',
			'menu_name'          => 'Gallery',
			'all_items'          => 'All photos',
			'add_new'            => 'Add photo',
			'add_new_item'       => 'Add photo',
			'edit_item'          => 'Edit photo',
			'new_item'           => 'New photo',
			'search_items'       => 'Search photos',
			'not_found'          => 'No photos found',
			'featured_image'     => 'Photograph',
			'set_featured_image' => 'Set photograph',
			'remove_featured_image' => 'Remove photograph',
			'use_featured_image' => 'Use as photograph',
		],
		'public'              => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => false,   // the classic edit screen: a title, the photograph, the categories
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-format-gallery',
		'supports'            => ['title', 'thumbnail'],
		'has_archive'         => false,
		'rewrite'             => false,
		'exclude_from_search' => true,
	]);

	register_taxonomy('lfms_photo_category', 'lfms_photo', [
		'labels' => [
			'name'          => 'Categories',
			'singular_name' => 'Category',
			'menu_name'     => 'Categories',
			'add_new_item'  => 'Add category',
			'edit_item'     => 'Edit category',
		],
		'public'            => false,
		'show_ui'           => true,
		'show_in_rest'      => false,
		'hierarchical'      => true,   // ticked boxes in the edit screen
		'show_admin_column' => true,
		'rewrite'           => false,
	]);
});

/* the two sizes the page uses. Never cropped (the gallery shows every photograph whole). WordPress saves these
   sizes without the photo's metadata, so the GPS position a phone writes into the original never reaches the page */
add_action('after_setup_theme', function () {
	add_image_size('lfms-gallery-tile', 960, 720, false);
	add_image_size('lfms-gallery-full', 1600, 1600, false);
});

/* "Caption" instead of "Add title", and a thumbnail column in the list of photos */
add_filter('enter_title_here', function ($text, $post) {
	return $post->post_type === 'lfms_photo' ? 'Caption (what is in the photograph, and when)' : $text;
}, 10, 2);
add_filter('manage_lfms_photo_posts_columns', function ($cols) {
	return array_merge(['cb' => $cols['cb'], 'lfms_thumb' => 'Photo'], array_diff_key($cols, ['cb' => 1]));
});
add_action('manage_lfms_photo_posts_custom_column', function ($col, $id) {
	if ($col === 'lfms_thumb') {
		echo get_the_post_thumbnail($id, [80, 80], ['style' => 'width:80px;height:auto;border-radius:4px']);
	}
}, 10, 2);

/* the page template's body classes (the same pattern as the RPM Club template's "cpage rpage") */
add_filter('body_class', function ($classes) {
	if (is_page_template('template-gallery.php')) {
		$classes[] = 'cpage';
		$classes[] = 'gpage';
	}
	return $classes;
});

/* the page's own style and script, on the Gallery template only. GSAP is the theme's vendored copy (3.15.0);
   Flip is the matching GSAP plugin, added to assets/js/vendor/. Without them the filter still works, without motion. */
add_action('wp_enqueue_scripts', function () {
	if (!is_page_template('template-gallery.php')) {
		return;
	}
	$uri = get_template_directory_uri();
	$dir = get_template_directory();
	wp_enqueue_style('aan-gallery', $uri . '/assets/css/aan-gallery.css', [], filemtime($dir . '/assets/css/aan-gallery.css'));
	wp_enqueue_script('aan-gallery-gsap', $uri . '/assets/js/vendor/gsap.min.js', [], '3.15.0', true);
	wp_enqueue_script('aan-gallery-flip', $uri . '/assets/js/vendor/Flip.min.js', ['aan-gallery-gsap'], '3.15.0', true);
	wp_enqueue_script('aan-gallery', $uri . '/assets/js/aan-gallery.js', ['aan-gallery-flip'], filemtime($dir . '/assets/js/aan-gallery.js'), true);
});
