type Book = {
  id?: number
  category_id: number
  author_id: number
  book_image?: string
  book_title: string
  slug: string
  book_desc: string
  created_at: Date
  updated_at: Date
}

export default Book
