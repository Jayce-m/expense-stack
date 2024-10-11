// This file is for DRIZZLE ORM CONFIGURATION
// https://orm.drizzle.team/docs/migrations

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema', // all files inside of 'schema'
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
});