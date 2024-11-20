// components/NewsCards.js
import React from 'react';
import { MdArrowRight, MdComment, MdPerson } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon } from 'lucide-react'

// HomeNewsCard Component
const HomeNewsCard = React.forwardRef(
  (
    { image, title, date, author, comments, description, link, className, ...props },
    ref
  ) => (
    <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={image} alt="" className="rounded-t-lg hoverImg" />
        <p className="font-bold text-white bg-orange flex flex-col w-fit pt-3 pb-7 px-6 absolute right-0 bottom-0 rounded-tl-lg">
          {date.day} <span className="font-normal text-xs">{date.month}</span>
        </p>
      </div>
      <div className="border border-[#ebe6de] rounded-b-lg relative">
        <div className="absolute w-full h-5 -top-5 bg-white rounded-t-[20px]"></div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-xs">
              <MdPerson className="text-orange text-base" /> {author}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <MdComment className="text-orange text-base" /> {comments} BÌNH LUẬN
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold py-2 hover:text-orange">
            {title}
          </CardTitle>
          <CardContent className="p-0">
            <p className="pt-2 leading-8">{description}</p>
          </CardContent>
          <CardFooter className="p-0">
            <a
              href={link}
              className="flex items-center gap-2 text-orange text-sm font-bold mt-2"
            >
              ĐỌC THÊM <MdArrowRight />
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
);
HomeNewsCard.displayName = "HomeNewsCard";


// FeaturedNewsCard Component
const FeaturedNewsCard = React.forwardRef(
  (
    { image, title, description, date, category, buttonText, onButtonClick, className, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold mb-2">
          {category}
        </span>
        <h3 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-lg mb-4 line-clamp-2 md:line-clamp-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span className="text-sm">{date}</span>
          </div>
          <Button variant="secondary" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
);
FeaturedNewsCard.displayName = "FeaturedNewsCard";


// NewsCard Component
const NewsCard = React.forwardRef(
  (
    { image, title, description, content, buttonText, onButtonClick, className, ...props },
    ref
  ) => (
    <Card ref={ref} className={cn(className)} {...props}>
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </CardContent>
      )}
      <CardFooter>
        <Button variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
);
NewsCard.displayName = "NewsCard";

export { HomeNewsCard, FeaturedNewsCard, NewsCard };
