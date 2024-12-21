import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";

export default function NewsPostingPage() {
  const router = useRouter();
  const id = router.query.id;

  const [author, setAuthor] = useState("test");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  const getNewsById = useCallback(async () => {
    if (!id) return;

    const getNewsByIdApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news?id=${id}`;

    try {
      const response = await fetch(getNewsByIdApi, {
        method: "GET",
        headers: {
          admin: "true",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Send request failed");
      }

      const res = await response.json();
      setTitle(res.data.title);
      setDescription(res.data.description);
      setContent(res.data.content);
      setPreviewImage(res.data.image);
    } catch (error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại");
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }
    getNewsById();
  }, [getNewsById, router]);

  const getAuthor = useCallback(async () => {
    const getAdminApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin`;

    try {
      const response = await fetch(getAdminApi, {
        method: "GET",
        headers: {
          admin: "true",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Send request failed");
      }

      const res = await response.json();
      setAuthor(`${res.data.firstName} ${res.data.lastName}`);
    } catch (error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại");
    }
  }, []);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("news-image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("authorId", author);

    const createNewsApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/create`;

    try {
      const response = await fetch(createNewsApi, {
        method: "POST",
        headers: {
          admin: "true",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("failed");
      }
      alert("success");
    } catch (error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại");
      console.log(error);
    }
    setTitle("");
    setDescription("");
    setContent("");
    setImage(null);
    router.push("/admin/news");
  };

  return (
    <div className="container mx-auto pt-10 pl-64">
      {id ? (
        <h1 className="text-2xl font-semibold mb-4">Chỉnh sửa bài viết</h1>
      ) : (
        <h1 className="text-2xl font-semibold mb-4">Tạo Bài Viết Mới</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
        </form>
        {/* Preview card */}
      </div>
    </div>
  );
}
