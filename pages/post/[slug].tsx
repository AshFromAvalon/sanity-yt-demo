import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { client, urlFor } from '../../lib/sanity'
import { Post } from '../../typings'

interface PostProps {
  post: Post
}

const Post = ({ post }: PostProps) => {
  console.log(post)
  return (
    <main>
      <Header />

      <img 
        className='w-full h-40 object-cover' 
        src={urlFor(post.mainImage).url()!} 
        alt="article cover" />

      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3' >{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2' >{post.description}</h2>
        <div className='flex items-center space-x-2'>
          <img 
            className='h-10 w-10 rounded-full'
            src={urlFor(post.author.image).url()!} 
            alt="author picture" 
          />
          <p className='font-extralight text-sm'>
            Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at { new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await client.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return { 
    paths, 
    fallback: 'blocking', 
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    body
    }`

  const post = await client.fetch(query, {
    slug: params?.slug,
  })

  if(!post) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 6000,
  };
};

