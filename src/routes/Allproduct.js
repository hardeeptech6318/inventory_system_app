import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'flowbite-react';
import { Pencil,Trash2  } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Allproduct() {
    const [product,setproduct]=useState([])
    const navigate = useNavigate();
    const fetchdata=async()=>{
        const data=await axios.get(`${process.env.REACT_APP_APIURL}allproduct`)
        setproduct(data.data.data)
    }

    useEffect(()=>{
       fetchdata()
    },[])

    const deleteProduct=async(id)=>{
        try {
            const response=await axios.delete(`${process.env.REACT_APP_APIURL}deleteproduct?id=${id}`,{
                
            })
            toast.success(response?.massage);
            fetchdata()
        } catch (error) {
            console.log(error);
        }
       
    }
    
  return (
    <section>
        
        <Toaster />
        <div className='my-5 text-center text-3xl'>Product List</div>
<div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>category</Table.HeadCell>
          <Table.HeadCell>quantity</Table.HeadCell>
          <Table.HeadCell>selling_price</Table.HeadCell>
          <Table.HeadCell>cost_price</Table.HeadCell>
          <Table.HeadCell>description</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {product?.map((item,i)=>(
          <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            
          
                
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.category}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.quantity}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.selling_price}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.cost_price}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.description}</Table.Cell>
<Table.Cell  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"><span className='flex gap-2'>
    <Button className='w-8 h-8 ' onClick={()=>navigate(`/${item._id}`)}><Pencil className='w-5 h-5' /></Button>
    {/* <Deletemodal id={item._id}/> */}
    <Button className='h-8 w-8 text-red-500' onClick={()=>deleteProduct(item._id)}><Trash2  className='h-5 w-5'/></Button>
    </span></Table.Cell>
    
            
            
          
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>

        
    </section>
  )
}

export default Allproduct