import { client } from "../../../libs/microcms";
import type { News } from "../../../types/news";
import { notFound } from "next/navigation";

// ↓ ここに 「export default」 が付いていますか？
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: News = await client
    .get({
      endpoint: "news",
      contentId: id,
    })
    .catch(() => notFound());

  return (
    <html>
      <body>
        <main style={{ padding: "20px" }}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </main>
      </body>
    </html>
  );
}
