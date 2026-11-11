<?php
/**
 * One-time import of the gallery's first 25 photographs (update 2).
 *
 *   wp eval-file import-gallery.php /path/to/this/import/folder
 *
 * Needs inc/gallery.php loaded (the lfms_photo type and the lfms_photo_category taxonomy).
 * Creates the five categories, then one Gallery photo per entry in photos.json: the caption as its title, the file as
 * its photograph (with its alternative text), its category, and descending publish dates so the order stays newest first.
 * Safe to run twice: an entry whose slug already exists is skipped.
 */

if (!defined('WP_CLI')) {
	exit("Run with: wp eval-file import-gallery.php <folder>\n");
}
if (!post_type_exists('lfms_photo') || !taxonomy_exists('lfms_photo_category')) {
	WP_CLI::error('inc/gallery.php is not loaded: the lfms_photo type is missing.');
}

$dir = rtrim($args[0] ?? __DIR__, '/\\');
$data = json_decode(file_get_contents($dir . '/photos.json'), true);
if (!$data) {
	WP_CLI::error("photos.json not found or unreadable in $dir");
}

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

foreach ($data['categories'] as $cat) {
	if (!term_exists($cat['slug'], 'lfms_photo_category')) {
		wp_insert_term($cat['name'], 'lfms_photo_category', ['slug' => $cat['slug']]);
		WP_CLI::log("category: {$cat['name']}");
	}
}

$start = strtotime('2026-11-09 12:00:00');
foreach ($data['photos'] as $i => $p) {
	if (get_page_by_path($p['slug'], OBJECT, 'lfms_photo')) {
		WP_CLI::log("skip (exists): {$p['slug']}");
		continue;
	}
	$file = $dir . '/photos/' . $p['file'];
	if (!is_file($file)) {
		WP_CLI::warning("missing file: {$p['file']}");
		continue;
	}
	$date = date('Y-m-d H:i:s', $start - $i * 60);   // one minute apart: the list's order is the page's order
	$post_id = wp_insert_post([
		'post_type'   => 'lfms_photo',
		'post_status' => 'publish',
		'post_title'  => $p['caption'],
		'post_name'   => $p['slug'],
		'post_date'   => $date,
	], true);
	if (is_wp_error($post_id)) {
		WP_CLI::warning("{$p['slug']}: " . $post_id->get_error_message());
		continue;
	}
	$tmp = wp_tempnam($p['file']);
	copy($file, $tmp);
	$att = media_handle_sideload(['name' => $p['file'], 'tmp_name' => $tmp], $post_id, $p['caption']);
	if (is_wp_error($att)) {
		@unlink($tmp);
		WP_CLI::warning("{$p['slug']}: " . $att->get_error_message());
		continue;
	}
	update_post_meta($att, '_wp_attachment_image_alt', $p['alt']);
	set_post_thumbnail($post_id, $att);
	wp_set_object_terms($post_id, [$p['category']], 'lfms_photo_category');
	WP_CLI::log("ok: {$p['slug']}");
}
WP_CLI::success('Gallery import finished.');
