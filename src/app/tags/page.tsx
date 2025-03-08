// app/tags/page.tsx

import { type Metadata } from "next";
import { Tags } from "~/components/tags/tags";
import { getTags } from "~/lib/tags-data";


export const metadata: Metadata = {
  title: 'Tags - Stack Overflow Clone',
  description: 'Browse tags for questions on Stack Overflow',
};

export default async function TagsPage() {
  // Fetch tags data
  const tags = await getTags();
  
  return <Tags initialTags={tags} />;
}