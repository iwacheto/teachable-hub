import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "1y5b1ltj",
  dataset: "production",
  apiVersion: "2022-10-10",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
//   projectId: process.env.SANITY_PROJECT_ID,
//   dataset: process.env.SANITY_DATASET,
//   apiVersion: "2022-10-10",
//   token: process.env.SANITY_TOKEN,
//   useCdn: false,
});
