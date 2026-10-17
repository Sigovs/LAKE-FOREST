# D3 homepage — prototype status (2026-10-16)

Live preview: https://sigovs.github.io/LAKE-FOREST/ → `sketches/d3/`. Previous versions: `versions/d2/`, `versions/v1/`.

## What works
- Full homepage: Hero → History (1923 · 1953 · #76 · Le Mans 1976 · Lake Forest Sports Cars, now sold · father and son) → transition "By Mancuso" → the GT announcement → RPM Club → Instagram → contact → footer.
- Motion (desktop ≥1000px): hero push; 1923→1953 join (pinned); #76, 009 and RPM-list parks; transition pin (trailer → print → BY MANCUSO → GT bay). Phones: hero push and a MANCUSO paint-on only, no pins. Reduced motion and no-JS: complete static page.
- Mobile menu (focus trap, Esc, closes on link), section anchors (land on composed frames, focus moves), enquiry form validation.

## Prototype limitations
- **The form sends nothing.** It validates and says so ("This prototype is not connected yet, so nothing was sent.").
- **Contacts, Instagram handle and posts are placeholders** marked "To be confirmed"; no posts are shown.
- **The GT has no imagery or specification**: "To be announced". No still from the GT film is used — needs the client's permission (client question #10).
- **New company name and the crest are not shown.** LFSC has been sold; the page signs "by Mancuso" until the new brand is announced (question #0) and the crest vector arrives (question #8).
- **RPM Club episodes** are a snapshot of the public feed on 16 Oct 2026, linked to the real episodes; show artwork is withheld until permission (question #12).
- **Photo rights** for credited archive prints are unconfirmed (question #15). Captions keep printed credits.
- **Unverified claims are worded as such** (Sebring event, 218 mph session, the Revell "customer car" note).
- **Browser support**: tested in Chrome (desktop and emulated phones). Name trimming uses `text-box: trim-both` (no Firefox equivalent yet — positions may drift there). Real iOS Safari / touch momentum not tested.
- **Hero video** not yet supplied; the hero is the Le Mans 1976 still.

## Open review notes (last independent review)
- At 1440/1280 with motion, BY / MANCUSO and RPM CLUB briefly share the viewport (never both whole).
- Phone makes wall is 41–43px (ASTON MARTIN at wdth 100 cannot fit two makes per line).
- On short desktop windows the transparent nav links can sit over MANCUSO mid-push.

Client questions: `docs/client-questions.md`.
