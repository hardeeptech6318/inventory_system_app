import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div className='flex justify-center items-center h-screen flex-col '>
        <div className='text-3xl'>
            Welcome to Inventory Management System
        </div>
       <Button className='my-5'> <Link to='/addproduct'>Add product</Link></Button>
    </div>
  )
}

export default Homepage