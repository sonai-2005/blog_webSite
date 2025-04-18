import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id , featuredImage , title}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
    <div className='w-full justify-center mb-4'>
    <img src={appwriteService.filePreview(featuredImage)} alt={title} className='rounded-xl' />

    </div>
    <h2 className ='font-bold text-xl'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard