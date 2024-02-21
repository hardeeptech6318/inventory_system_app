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
    const [initialData,setInitialData]=useState(undefined)
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


    useEffect(() => {
      if (initialData) {
        setValue('name', initialData.name);
        setValue('category', initialData.category);
        setValue('description', initialData.description);
        setValue('quantity', initialData.quantity);
        setValue('selling_price', initialData.selling_price);
        setValue('cost_price', initialData.cost_price);
      }
    }, [initialData]);


    const [imagePreview, setImagePreview] = useState(null);
 
    const schema = yup.object().shape({
        name: yup.string(),
        category: yup.string(),
        description: yup.string(),
        quantity: yup.number().positive().integer(),
        selling_price: yup.number().positive().integer(),
        cost_price: yup.number().positive().integer(),
        image: yup.mixed().nullable()
      });
      



      const { register, handleSubmit, formState:{ errors ,isSubmitting}, setValue } = useForm({
        defaultValues: {
          name: initialData?.name || '', // Use optional chaining to handle potential null or undefined initialData
          category: initialData?.category || '',
          description: initialData?.description || '',
          quantity: initialData?.quantity || 0,
          selling_price: initialData?.selling_price || 0,
          cost_price: initialData?.cost_price || 0
        },
        resolver: yupResolver(schema)
      });
      

   

      const onSubmit =async (data) =>{ 
        try {
            console.log(data);
        
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
        
        const response = await axios.put(`${process.env.REACT_APP_APIURL}addproduct`, formData, {
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
        {initialData  && 
         <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-2 m-5 gap-3'>
      
      <div>
          <Label value="Product name" />
        
        <TextInput  defaultValue={initialData.name} {...register("name")}  placeholder="Please enter product name"  />
        {errors?.name && <span>This field is </span>}
        </div> 

        <div>
          <Label value="Quantity" />
        
        <TextInput type='number'  {...register("quantity")}  placeholder="Please enter quantity"  />
        {errors?.quantity && <span>This field is </span>}
        </div>


        <div>
          <Label value="category" />
        
        <TextInput   {...register("category")}  placeholder="Please enter category"  />
        {errors?.category && <span>This field is </span>}
        </div> 

        <div>
          <Label value="Selling price" />
        
        <TextInput type='number'   {...register("selling_price")}  placeholder="Please enter selling price"  />
        {errors?.selling_price && <span>This field is </span>}
        </div> 

        <div>
          <Label value="Cost price" />
        
        <TextInput  type='number'   {...register("cost_price")}  placeholder="Please enter cost price"  />
        {errors?.cost_price && <span>This field is </span>}
        </div> 

        <div>
          <Label value="Description" />
        
        <Textarea  type='number'   rows={4} {...register("description")}  placeholder="Please enter description"  />
        
{errors?.cost_price && <span>This field is </span>}
        </div> 

       

<div  className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Image" />
      </div>
      <FileInput accept="image/*"     {...register("image", {
    onChange: (e) => {handleFileInputChange(e)},
    
  })} helperText="Please enter a product image" />
      <img  src={imagePreview==null ?`${process.env.REACT_APP_APIURL}uploads/${initialData.image}` :imagePreview}  alt='product'/>
    
    </div>



      
      
      
      
<div className=' col-span-2'>
      <Button disabled={isSubmitting} >{isSubmitting ? 'Submitting': <input type="submit" />} </Button>
      </div>
    </form>
    }
    </section>
  )
}

export default EditProduct