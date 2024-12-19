class News {
  generateNewsId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    return `NW${timestamp}${randomNumber}`;
  }
  constructor({
    newsId = null,
    title,
    content,
    authorId,
    image = null,
    createAt = new Date(),
    updatedAt = new Date(),
    status = "Published", // "Published", "Draft", "Archived"
  }) {
    this.newsId = newsId || this.generateNewsId();
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.image = image;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
    this.status = status;
  }

  isPublished() {
    return this.status === "Published";
  }

  updateStatus(newStatus) {
    if (["Published", "Draft", "Archived"].includes(newStatus)) {
      this.status = newStatus;
      this.updatedAt = new Date();
    }
  }

  toObject() {
    return {
      newsId: this.newsId,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      image: this.image,
      createAt: this.createAt,
      updatedAt: this.updatedAt,
      status: this.status,
    };
  }
}

export default News;
