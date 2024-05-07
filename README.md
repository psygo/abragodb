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

#-----------------------------------------------------------
```

### EdgeDB
