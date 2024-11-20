import React from 'react';
import { useRouter } from 'next/router';
import latestNews from '../../data/latestNews.json';
import featuredArticles from '../../data/featuredArticles.json';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
} from "lucide-react";

const NewsDetail = ({ article, relatedArticles }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Đang tải...</div>;
  }

  if (!article) {
    return <div>Bài viết không tồn tại</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{`${article.title} | Tên Trang Web`}</title>
        <meta name="description" content={article.description || "Thông tin bài viết"} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Nút Quay lại */}
          <Button variant="ghost" className="mb-4 -ml-2" onClick={() => window.history.back()}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Quay lại trang trước
          </Button>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>{article.readTime} phút đọc</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={article.authorImage} alt={article.author} />
                <AvatarFallback>{article.authorInitials || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{article.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{article.authorTitle}</p>
              </div>
            </div>
          </header>

          {/* Ảnh */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-8"
          />

          {/* Nội dung */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            {article.content}
          </div>

          {/* Hành động */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <ThumbsUpIcon className="h-4 w-4 mr-2" />
                Thích
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Bình luận
              </Button>
              <Button variant="outline" size="sm">
                <ShareIcon className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div>

          {/* Bài viết liên quan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bài viết liên quan</h3>
            <ul className="space-y-4">
              {relatedArticles.map((item) => (
                <li key={item.slug} className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Phần bình luận */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bình luận</h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`Commenter ${item}`} />
                    <AvatarFallback>U{item}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">User {item}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      This is a sample comment. Great article!
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Input placeholder="Viết gì đó..." />
              <Button className="mt-2">Đăng bình luận</Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  const allArticles = [...latestNews, ...featuredArticles];

  const paths = allArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const allArticles = [...latestNews, ...featuredArticles];
  const article = allArticles.find((item) => item.slug === slug);

  const relatedArticles = allArticles
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      relatedArticles,
    },
  };
}

export default NewsDetail;
