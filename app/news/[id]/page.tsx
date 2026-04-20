import { client } from "../../../libs/microcms";
import type { News } from "../../../types/news";
import { notFound } from "next/navigation";

// ビルド時に全ての記事IDを取得して、Next.jsに教えるための関数
export async function generateStaticParams() {
  const data = await client.get({
      endpoint: "news",
  });

  // 各記事のIDを配列にして返す
  return data.contents.map((post: News) => ({
      id: post.id,
  }));
}

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
