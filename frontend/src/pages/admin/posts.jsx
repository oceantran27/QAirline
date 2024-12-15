import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function NewsPostingPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ title, description, content, image });
    alert("success")
    // Clear the form after submission
    setTitle('');
    setDescription('');
    setContent('');
    setImage(null);
  };

  return (
    <div className="container mx-auto pt-10 pl-64">
      <h1 className="text-2xl font-semibold mb-4">Thông Tin & Bài Đăng</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Tiêu Đề</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề của bài đăng"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả hoặc tóm tắt bài đăng"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Nội Dung</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập chi tiết nội dung bài đăng"
              required
              className="h-40"
            />
          </div>

          <div>
            <Label>Ảnh Minh Họa</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDragActive ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Kéo và thả hình ảnh vào đây hoặc click để chọn ảnh</p>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full">Đăng Bài</Button>
        </form>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Xem Trước</CardTitle>
          </CardHeader>
          <CardContent>
            {image && (
              <div className="mb-4">
                <Image
                  src={image}
                  alt="News article illustration"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{title || 'Tiêu Đề'}</h2>
            <p className="text-gray-600 mb-4">{description || 'Mô tả'}</p>
            <div className="prose max-w-none">
              {content ? (
                <p>{content}</p>
              ) : (
                <p className="text-gray-400">Nội dung sẽ xuất hiện tại đây</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

