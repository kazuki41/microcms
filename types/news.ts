export type News = {
  id: string;
  title: string;       // タイトル (text)
  description: string; // 概要 (textArea)
  content: string;     // 内容 (richEditorV2 はHTML文字列として返ります)
  
  // カテゴリー (relation: 他のコンテンツとの紐付け)
  // 紐付け先の型が未作成の場合は一旦 any または object としておきます
  category?: any;      

  // サムネイル画像 (media)
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };

  // microCMSが自動付与するシステム項目
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};