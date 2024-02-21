import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table, TextInput } from 'flowbite-react';
import { Pencil,Trash2  } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

function Allproduct() {
    const [product,setproduct]=useState([])
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = product.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const navigate = useNavigate();
    const fetchdata=async()=>{
        const data=await axios.get(`${process.env.REACT_APP_APIURL}allproduct`)
        setproduct(data.data.data)
    }

    useEffect(()=>{
       fetchdata()
    },[])

    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setFilterText('');
        }
      };
      return <TextInput onChange={e => setFilterText(e.target.value)} placeholder='Search by Product Name' value={filterText} />;
    }, [filterText]);

    const columns = [
      {
        name: 'PRODUCT NAME',
        selector: row => row.name,
        sortable: true,
      },
      {
        name: 'CATEGORY',
        selector: row => row.category,
        sortable: true,
      },
      {
        name: 'QUANTITY',
        selector: row => row.quantity,
        sortable: true,
      },
      {
        name: 'SELLING_PRICE',
        selector: row => row.selling_price,
        sortable: true,
      },
      {
        name: 'COST_PRICE',
        selector: row => row.cost_price,
        sortable: true,
      },
      {
        name: 'DESCRIPTION',
        selector: row => row.description,
        sortable: true,
      },
      {
        name: 'ACTIONS',
        selector: row => row.actions,
        cell:(e)=><span className='flex gap-2'>
        <Button className='w-8 h-8 ' onClick={()=>navigate(`/${e._id}`)}><Pencil className='w-5 h-5' /></Button>
        {/* <Deletemodal id={item._id}/> */}
        <Button className='h-8 w-8 text-red-500' onClick={()=>deleteProduct(e._id)}><Trash2  className='h-5 w-5'/></Button>
        </span>
      },
    ];

   
  

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
        {/* <div className='my-5 text-center text-3xl'>Product List</div> */}
       
<div>
<DataTable
title="Product List"
			columns={columns}
			// data={product}
      data={filteredItems}
      subHeader subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
		/>
</div>





        
    </section>
  )
}

export default Allproduct