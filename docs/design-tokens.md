# Design tokens (dark theme)

| Token            | CSS variable                | Value     | Usage                                                    |
| ---------------- | --------------------------- | --------- | -------------------------------------------------------- |
| Brand accent     | `--brand-accent`            | `#4cd7f6` | Links, chips, timeline, CTAs, highlights                 |
| On accent        | `--brand-accent-foreground` | `#042028` | Text on filled accent buttons                            |
| Accent hover     | `--brand-accent-hover`      | `#3bc4e3` | `:hover` on accent fills                                 |
| Available status | `--status-available`        | `#4edea3` | Semantic “open to work” indicator (not marketing accent) |

Tailwind: `text-brand-accent`, `bg-brand-accent`, `text-brand-accent-foreground`, `hover:bg-brand-accent-hover`, `bg-status-available`.

Shadcn `primary` on `.dark` aliases `--brand-accent` so existing `text-primary` / `bg-primary` match the brand accent.
