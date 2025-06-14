# TanStack Query: Simplifying Data Fetching in React

TanStack Query, formerly known as React Query, is a powerful library that simplifies data fetching, caching, synchronization, and more in React applications. It helps you manage server-side data in a declarative way, reducing the complexity of making HTTP requests and managing state.

In this guide, we'll explore how to use the `useQuery` hook to fetch data efficiently.

## What is useQuery?

`useQuery` is a hook provided by TanStack Query that fetches data asynchronously and manages the loading, error, and success states for you. It abstracts away the complexity of handling data fetching logic in your components.

## Steps to Setup TanStack Query

Before using `useQuery`, you need to install TanStack Query and set it up in your React application.

### 1. Install TanStack Query:

First, install TanStack Query via npm, yarn, or pnpm:

```bash
# Using npm
npm install @tanstack/react-query

# Using yarn
yarn add @tanstack/react-query

# Using pnpm
pnpm add @tanstack/react-query
```

### 2. Set Up QueryClientProvider:

For Next.js 15, we need to create a Provider component first, then use it to wrap our application. Here's how to implement it:

First, create a new provider component in `components/providers/query-provider.tsx`:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Then, use this provider in your root layout file (`app/layout.tsx`):

```tsx
import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

This approach ensures that:

1. The QueryClient is properly initialized on the client side (using 'use client' directive)
2. The client instance persists across renders using useState
3. The provider is available throughout your application
4. It follows Next.js 15's app router conventions

## Using useQuery to Fetch Data

Now that TanStack Query is set up, let's dive into using the `useQuery` hook to fetch data.

### Example: Fetching Data from a REST API

Here's a practical example of using `useQuery` to fetch and manage data:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
  // ... other user properties
}

interface UserResponse {
  data: User[];
  total: number;
  // ... other response properties
}

async function getData<T>({
  path,
  params,
}: {
  path: string;
  params: URLSearchParams;
}): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${path}?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function UserList({ params }: { params: URLSearchParams }) {
  const { data, isPending, error } = useQuery<UserResponse>({
    queryKey: ["users", Object.fromEntries(params.entries())],
    queryFn: () =>
      getData<UserResponse>({
        path: "/users",
        params,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.data.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

Key features of this implementation:

1. **Type Safety**: We define interfaces for our data structure
2. **Error Handling**: Proper error states and loading states
3. **Reusable Data Fetching**: A generic `getData` function that can be used across different queries
4. **Query Configuration**:
   - `staleTime`: Controls how long data is considered fresh
   - `retry`: Number of retry attempts on failure
   - `queryKey`: Unique identifier for caching and invalidation
5. **Client Component**: Uses "use client" directive for Next.js client components

This pattern can be adapted for any API endpoint by:

- Updating the interfaces to match your data structure
- Modifying the path in the query function
- Adjusting the query key to match your caching needs
- Customizing the stale time and retry settings

### Explanation of the Code

#### fetchUsers Function

- This is an asynchronous function that fetches the data from an API (in this case, a sample API endpoint from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com))
- We use `fetch()` to make the HTTP request, and if the response is successful, we return the data in JSON format

#### useQuery Hook

- `useQuery` takes two arguments:
  1. The first argument is a unique key ('users' in this case) that identifies the query. This key helps TanStack Query manage caching and refetching
  2. The second argument is the function (`fetchUsers`) that fetches the data
- The hook returns an object with properties such as `data`, `error`, and `isLoading`:
  - `data`: The fetched data (in our case, the list of users)
  - `isLoading`: A boolean indicating if the data is still being fetched
  - `error`: Any error that occurred during the data fetching process

#### Conditional Rendering

- If the data is still loading, we display a loading message
- If there's an error, we display the error message
- Once the data is fetched successfully, we display the list of users

### Key Features of useQuery

#### Caching

- TanStack Query automatically caches the fetched data
- If you try to fetch the same data again, it will be instantly available from the cache without making another network request

#### Automatic Refetching

- By default, TanStack Query refetches data when:
  - The component remounts
  - The query key changes
  - The window is refocused
  - The network is reconnected

#### Error Handling

- TanStack Query provides built-in error handling
- Gives you easy access to error messages
- Makes it simple to manage failures in data fetching

#### Pagination and Infinite Queries

- For more complex data fetching scenarios like pagination or infinite scrolling
- TanStack Query offers additional hooks like `useInfiniteQuery` to handle these patterns

## Conclusion

With TanStack Query, fetching data in React applications has never been easier. The `useQuery` hook not only handles the fetching logic but also provides features like caching, error handling, and data synchronization. It greatly improves the development experience by abstracting away many complexities of traditional data fetching.

Now that you've seen how to use `useQuery` for fetching data, you can start integrating TanStack Query into your projects for cleaner, more maintainable code.
