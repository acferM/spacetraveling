import type { GetServerSideProps, NextPage } from 'next'
import * as Prismic from '@prismicio/client'

import { PostPreview } from '../components/PostPreview'
import { getPrismicClient } from '../services/prismic'
import { Container } from '../styles/pages/Home'

type Post = {
  slug: string
  title: string
  date: string
  description: string
  creator: string
}

interface HomeProps {
  posts: Post[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Container>
      <img src="/logo.svg" alt="spacetraveling"/>

      <main>
        {posts.map(post => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    Prismic.predicate.at('document.type', 'post'), 
    {
      fetch: ['post.title', 'post.description', 'post.creator']
    }
  )

  const posts = response.results.map(post => ({
    slug: post.uid,
    title: post.data.title[0].text,
    description: post.data.description[0].text,
    creator: post.data.creator[0].text,
    date: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }))

  return {
    props: {
      posts
    },
  }
}

export default Home
