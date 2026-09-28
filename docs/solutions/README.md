# Solutions

Solved problems a future session should not rediscover. One file per lesson: `docs/solutions/<slug>.md`.

Search this folder before changing a related area. Write a file only when a future session would otherwise repeat the mistake. Rules that apply every time belong in `skills/` instead.

```yaml
---
title: Do not edit app/blog/page.tsx to add a post
date: YYYY-MM-DD
category: content
tags: [blog, mdx]
module: content/blog
---
Symptom: agent edited the listing page to add a post.
Failed: changing `app/blog/page.tsx` does not register MDX.
Worked: add `content/blog/<slug>.mdx`; the listing reads that folder.
Prevent: posts are MDX files, never listing-page edits.
```

These notes are operating memory. They are not site pages and not blog posts.
