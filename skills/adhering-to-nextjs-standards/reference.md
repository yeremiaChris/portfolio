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

## Valibot schema + inferred type

```ts
import * as v from "valibot";

export const contactSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  message: v.pipe(v.string(), v.minLength(10)),
});

export type ContactInput = v.InferOutput<typeof contactSchema>;
```

## React Hook Form + Valibot (non-trivial form)

```tsx
"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import { contactSchema, type ContactInput } from "@/lib/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: valibotResolver(contactSchema),
  });

  function onSubmit(data: ContactInput) {
    // call server action or mutation
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      {errors.email ? <p role="alert">{errors.email.message}</p> : null}
      <textarea {...register("message")} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Server Action (validated, focused)

```ts
"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";

import { contactSchema } from "@/lib/contact";

export async function submitContact(raw: unknown) {
  const parsed = v.safeParse(contactSchema, raw);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid input" };
  }

  // persist parsed.output — one job only
  revalidatePath("/contact");
  return { ok: true as const };
}
```

## Day.js in UI

```ts
import dayjs from "dayjs";

export function formatPostDate(iso: string): string {
  return dayjs(iso).format("MMM D, YYYY");
}
```

Avoid `new Date(...).getMonth()` chains in components when Day.js is available.

## TanStack Query (client cache / mutations)

Prefer Server Components + `fetch` for the first paint. Use Query when the project already has it and you need client refetch, stale-while-revalidate, or shared cache:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchNotifications } from "@/lib/notifications";

export function NotificationBell() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  if (isPending) return <span aria-busy="true">…</span>;
  if (isError) return <span role="alert">Could not load</span>;
  return <span>{data.length}</span>;
}
```

Keep query keys stable arrays: `["resource"]`, `["resource", id]`.

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
