# ABRAGO DB

A database for Brazilian Go players.

You can check out the future plans for the project in the [`tasks.md`](./tasks.md) file.

## Services and Tech

- [Vercel](https://vercel.com) for handling deployment.
- [EdgeDB](https://www.edgedb.com/)
- [Clerk Auth](https://clerk.com/)

## Dev

### Environment Variables

This is the shape of the project's environment variables:

```env
#-----------------------------------------------------------
# 1. Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CLERK_WEBHOOKS_USER_EVENTS=

#-----------------------------------------------------------
```

### EdgeDB

To create migrations:

```sh
edgedb migration create
edgedb migrate
```

If you would like to reset things, you can:

```sh
edgedb
```

And then use `reset schema to initial;`.

You will also probably need to update Next.js' inferred types with:

```sh
pnpx @edgedb/generate edgeql-js
```

It's also possible to watch for diffs on EdgeDB with:

```sh
edgedb watch
```

### Using Ngrok for Local Development

Expose your local host to the web:

```sh
ngrok http http://localhost:3000
```
