State management:
- currently this repo is using tanstack query for state management, this is async and we should
consider using an alternative such as Zustand for managing non async state



HOSTING:
- hosted on fly.io
- remember to send .env variables when making changes there, can send individual entries with
```bash
fly secret set /secret here/
```

FORMS:
- using ShadCN's wrapper around React-hook-form, this uses Zod for validation

DATABASE:
when editing the schema make sure you generate the migration again
```bash
bun drizzle-kit generate
```
then run migrate.ts from root directory
```bash
bun migrate.ts
```

to see the Drizzle studio:
```bash
bunx drizzle-kit studio
```


References:
https://www.youtube.com/watch?v=jXyTIQOfTTk


Useful reading for validation of numbers in forms:
https://github.com/shadcn-ui/ui/issues/421


Useful for making am money input mask
https://gist.github.com/Sutil/5285f2e5a912dcf14fc23393dac97fed