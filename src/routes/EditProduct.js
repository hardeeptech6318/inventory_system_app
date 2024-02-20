import axios from 'axios';

import { useParams } from 'react-router-dom';
import React, { useState,useEffect } from 'react'
import { Button, FileInput, Label, TextInput,Textarea  } from 'flowbite-react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from 'react-hot-toast';


function EditProduct() {
    const { id } = useParams();
    const [initialData,setInitialData]=useState({})
    const fetchdata=async()=>{
        try {
            const data=await axios.get(`${process.env.REACT_APP_APIURL}productdetailsbyid?id=${id}`)
            setInitialData(data?.data?.data?.[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
fetchdata()
    },[])


    const [imagePreview, setImagePreview] = useState(null);
 
    const schema = yup.object().shape({
        name: yup.string().required(),
        category: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().positive().integer().required(),
        selling_price: yup.number().positive().integer().required(),
        cost_price: yup.number().positive().integer().required(),
        image: yup.mixed().nullable().required("Please upload an image"),
      });
      

      const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

   

      const onSubmit =async (data) =>{ 
        try {
            
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('id', initialData._id);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('quantity', data.quantity);
        formData.append('selling_price', data.selling_price);
        formData.append('cost_price', data.cost_price);
        // formData.append('image', data.image[0]);
        if (data.image[0]) {
          formData.append('image', data.image[0]);
        }
        
        const response = await axios.put(`${process.env.REACT_APP_APIURL}/addproduct`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
         
           toast.success(response.data.message)
           fetchdata()

        } catch (error) {
            toast.error("Something went wrong")
        }
    
      
     
    }

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <section className='  '>
        
         <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-2 m-5 gap-3'>
      
      <div>
          <Label value="Product name" />
        
        <TextInput  defaultValue={initialData.name} {...register("name")}  placeholder="Please enter product name" required />
        {errors?.name && <span>This field is required</span>}
        </div> 

        <div>
          <Label value="Quantity" />
        
        <TextInput type='number' defaultValue={initialData.quantity} {...register("quantity")}  placeholder="Please enter category" required />
        {errors?.quantity && <span>This field is required</span>}
        </div>


        <div>
          <Label value="category" />
        
        <TextInput  defaultValue={initialData.category} {...register("category")}  placeholder="Please enter category" required />
        {errors?.category && <span>This field is required</span>}
        </div> 

        <div>
          <Label value="Selling price" />
        
        <TextInput type='number'  defaultValue={initialData.selling_price} {...register("selling_price")}  placeholder="Please enter category" required />
        {errors?.selling_price && <span>This field is required</span>}
        </div> 

        <div>
          <Label value="Cost price" />
        
        <TextInput  type='number' defaultValue={initialData.cost_price}  {...register("cost_price")}  placeholder="Please enter category" required />
        {errors?.cost_price && <span>This field is required</span>}
        </div> 

        <div>
          <Label value="Description" />
        
        <Textarea  type='number' defaultValue={initialData.description} required rows={4} {...register("description")}  placeholder="Please enter category"  />
        
{errors?.cost_price && <span>This field is required</span>}
        </div> 

       

<div  className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Image" />
      </div>
      <FileInput accept="image/*"     {...register("image", {
    onChange: (e) => {handleFileInputChange(e)},
    
  })} helperText="Please enter a product image" />
      <img  src={imagePreview==null ?`${initialData.image}` :imagePreview}  alt='product'/>
    
    </div>



      
      
      
      
<div className=' col-span-2'>
      <Button><input type="submit" /></Button>
      </div>
    </form>
    </section>
  )
}

export default EditProduct