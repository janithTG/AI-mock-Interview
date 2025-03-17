import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./src/schema.ts",
//   out: "./drizzle",
// });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.js",

//   driver: "pglite",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_cTGKVs9bES5N@ep-delicate-dawn-a53h0ziv-pooler.us-east-2.aws.neon.tech/ai-interview?sslmode=require",
  },
});

