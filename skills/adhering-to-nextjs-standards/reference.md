# Next.js standards — examples

Copy patterns only when the project already has (or the task adds) the matching library.

## Server page + client leaf

```tsx
// app/settings/page.tsx — Server Component (no "use client")
import { SettingsForm } from "@/components/settings/SettingsForm";
import { getProfile } from "@/lib/profile";

export default async function SettingsPage() {
  const profile = await getProfile();
  return <SettingsForm initial={profile} />;
}
```

```tsx
// components/settings/SettingsForm.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface SettingsFormProps {
  initial: { name: string };
}

export function SettingsForm({ initial }: SettingsFormProps) {
  const [name, setName] = useState(initial.name);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // mutation / server action
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

## Server Action (focused)

```ts
"use server";

import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const email = formData.get("email");
  const message = formData.get("message");

  // validate input
  if (!email || !message) {
    return { ok: false as const, error: "Missing required fields" };
  }

  // persist data — one job only
  revalidatePath("/contact");
  return { ok: true as const };
}
```

## Recoverable client async

```tsx
async function handleSave() {
  setError(null);
  setPending(true);
  try {
    await saveProfile(payload);
  } catch {
    setError("Save failed. Try again.");
  } finally {
    setPending(false);
  }
}
```

Route-level failures belong in `error.tsx` / `not-found.ts`, not a page-wide try/catch.
