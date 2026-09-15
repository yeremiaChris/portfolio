# Folder structure — examples

## Thin page (do this)

```tsx
// app/blog/page.tsx
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost(posts);

  return (
    <main>
      <BlogHeader />
      {featured ? <FeaturedPost post={featured} /> : null}
      <BlogPostGrid posts={posts} />
    </main>
  );
}
```

## Colocated Vitest (do this)

```ts
// lib/blog.test.ts
import { getPost } from "./blog";

it("returns null for an unknown slug", () => {
  expect(getPost("does-not-exist")).toBeNull();
});
```

## Do not

```text
src/features/blog/__tests__/blog.test.ts   # extra tree
app/blog/page.spec.ts                      # Playwright does not live in app/
components/ui/BlogCard.tsx                 # domain UI is not a primitive
```
