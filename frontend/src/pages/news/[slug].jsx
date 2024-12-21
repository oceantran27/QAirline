import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import latestNews from '../../data/latestNews.json';
// import featuredArticles from '../../data/featuredArticles.json';
import Head from 'next/head';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeftIcon,
  CalendarIcon,
} from "lucide-react";

const NewsDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [featuredArticles, setFeaturedArticles] = useState([])
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    getAllNews()
  }, [router]);

  useEffect(() => {
    if (slug && featuredArticles) {
      console.log(1)
      const allArticles = [...featuredArticles];
      const foundArticle = allArticles.find((item) => item.slug === slug);
      setArticle(foundArticle);

      const related = allArticles
        .filter((item) => item.slug !== slug)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [featuredArticles]);

  const getAllNews = async () => {
    const getAllNewsApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/all`

    try {
      const response = await fetch(getAllNewsApi, {
          method: "GET",
      })
      if (!response.ok) {
          throw new Error("Send request failed")
      }

      const res = await response.json()

      setFeaturedArticles(res.data.map(a => {return {
        "slug": a.newsId, 
        "image": a.image,
        "title": a.title, 
        "description": a.description, 
        "author": a.authorId, 
        "content": a.content,
        "date": a.createAt.seconds ? new Date(a.createAt.seconds*1000).toISOString().split('T')[0] : a.createAt.split('T')[0],
        "buttonText": "Đọc thêm",
        "authorTitle": "Nhà báo",
        "authorImage": "/AvatarUser/no_avatar.jpg",
      }}))

    } catch (error) {
        alert("Đã xảy ra lối, vui lòng thử lại")
    }
  }

  if (!article) {
    return <div>Đang tải...</div>;
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
          <Button variant="ghost" className="mb-4 -ml-2" onClick={() => router.back()}>
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
          {/* <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap items-center space-x-0 space-y-2 md:space-x-4 md:space-y-0 mb-4 md:mb-0">
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <ThumbsUpIcon className="h-4 w-4 mr-2" />
                Thích
              </Button>
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Bình luận
              </Button>
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <ShareIcon className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
            <Button variant="orange" size="sm" className="w-full md:w-auto">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div> */}

          {/* Bài viết liên quan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bài viết liên quan</h3>
            <ul className="space-y-4">
              {relatedArticles.map((item) => (
                <li key={item.slug} className="flex space-x-4">
                  <Link href={`/news/${item.slug}`} className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Phần bình luận */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
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
                      Đây là một bình luận mẫu. Bài viết thật tuyệt!
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Input placeholder="Viết gì đó..." />
              <Button variant="orange" className="mt-2">Đăng bình luận</Button>
            </div>
          </div> */}
        </article>
      </main>
    </div>
  );
};

export default NewsDetail;
