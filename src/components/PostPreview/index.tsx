import { FiCalendar, FiUser } from 'react-icons/fi'

import { Container } from "./styles";

type Post = {
  title: string
  date: string
  description: string
  creator: string
}

interface PostPreviewProps {
  post: Post
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <Container>
      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <footer>
        <div>
        <FiCalendar size={20} />
          <span>{post.date}</span>
        </div>

        <div>
          <FiUser size={20} />
          <span>{post.creator}</span>
        </div>
      </footer>
    </Container>
  )
}