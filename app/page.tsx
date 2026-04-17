import { client } from "../libs/microcms";
import type { News } from "../types/news";
import Link from "next/link";

export default async function Home() {
  const data = await client.get({
    endpoint: "news",
  });

  const contents: News[] = data.contents;

  return (
    <html>
      <body>
        <main>
          <h1>ニュース一覧</h1>
          <ul>
            {contents.map((post) => (
              <li key={post.id}>
                <Link href={`/news/${post.id}`}>
                  <strong>{post.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
          {contents.length === 0 && <p>記事がありません</p>}
        </main>
      </body>
    </html>
  );
}
