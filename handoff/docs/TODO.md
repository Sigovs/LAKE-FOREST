# Before launch

## 1. Connect the contact form (required)

- **Where the form is:** `contact.html`, `index.html` (`#contact`) and `gt.html` (`#enquire`).
- **What `js/form.js` does now:** it validates the name, the email and the message, and shows the error and success
  states. It does **not send anything**, and it never claims a message was sent.
- **What to do:**
  - Connect it to the client's mail service or an endpoint.
  - Keep the reserved error lines and the live status (`.enquiry__status`, `role="status"`).
- **Fields sent:** `name`, `email`, `phone` (optional), `topic` (`gt` · `cars` · `other`) and `message`.
- **The client's address on the site:** adam@LakeForestMotorsports.com.

## 2. Instagram (waiting on the client)

- The homepage `#instagram` grid shows archive photographs until the client confirms the handle.
- When the handle is confirmed, link the tiles or embed the feed.

## 3. RPM Club episodes (content)

- The latest episode, its audio URL and the three earlier episodes are written into `index.html` and `rpm.html` by
  hand, from the show's public feed (https://omny.fm/shows/rpm-club).
- Either update them by hand, or pull the feed at build time.

## Also check

- The `<title>` and `<meta name="description">` of each page. They are written, but have not been reviewed for SEO.
- The favicon: the pages use a temporary inline "M". Replace it with the crest when a square version exists.
- The analytics and cookie policy the client needs, if any. None is included.
