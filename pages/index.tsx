import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Key } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

import {client, urlFor} from '../lib/sanity'
import { Post } from "../typings";

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts } : HomeProps) {
  console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(post => {
         return (
            <Link key={post._id as Key} href={`/post/${post.slug.current}`} >
            <div className="border rounded-sm group cursor-pointer overflow-hidden">
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} />
                <div className="flex justify-between p-5 bg-white"> 
                  <div>
                    <p className="text-lg font-bold" >{post.title}</p>
                    <p className="text-xs">{post.description} by {post.author.name} </p>
                  </div>
                  <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} />
                </div>
            </div>
          </Link>
          )
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await client.fetch(query);
  
  return {
    props: {
      posts
    },
  };
};
