import React, { useState } from 'react'
import { Button, FileInput, Label, TextInput,Textarea  } from 'flowbite-react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';




function Addproduct() {
    // const [file, setFile] = useState();
    const [imagePreview, setImagePreview] = useState(null);
 
    const schema = yup.object().shape({
        name: yup.string().required(),
        category: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().positive().integer().required(),
        selling_price: yup.number().positive().integer().required(),
        cost_price: yup.number().positive().integer().required(),
        image: yup.mixed().required("Please upload an image"),
      });
      

      const { register, handleSubmit, reset,formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

   

      const onSubmit =async (data) =>{ 
        try {
            
        if(!data?.image[0]){return toast.error('Please upload an image')}
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('quantity', data.quantity);
        formData.append('selling_price', data.selling_price);
        formData.append('cost_price', data.cost_price);
        formData.append('image', data.image[0]);
        
        const response = await axios.post(`${process.env.REACT_APP_APIURL}addproduct`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success(response.data.message)
          reset()
          setImagePreview(null)
        } catch (error) {
            console.log(error);
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

      console.log(errors.name);
  return (
    <section className='  '>
        <Toaster />
         <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-2 m-5 gap-3'>
      
      <div>
          <Label value="Product name" />
        
        <TextInput  defaultValue="Mobile" {...register("name")}  placeholder="Please enter product name" required />
        {errors.name && <span className=' text-red-400'>This field is required</span>}
        </div> 

        <div>
          <Label value="Quantity" />
        
        <TextInput type='number'  {...register("quantity")}  placeholder="Please quantity" required />
        {errors.quantity && <span className=' text-red-400'>This field is required</span>}
        </div>


        <div>
          <Label value="category" />
        
        <TextInput  defaultValue="Mobile" {...register("category")}  placeholder="Please enter category" required />
        {errors.category && <span className=' text-red-400'>This field is required</span>}
        </div> 

        <div>
          <Label value="Selling price" />
        
        <TextInput type='number'  defaultValue="Mobile" {...register("selling_price")}  placeholder="Please enter selling price" required />
        {errors.selling_price && <span className=' text-red-400'>This field is required</span>}
        </div> 

        <div>
          <Label value="Cost price" />
        
        <TextInput  type='number' defaultValue="Mobile" {...register("cost_price")}  placeholder="Please enter cost price" required />
        {errors.cost_price && <span className=' text-red-400'>This field is required</span>}
        </div> 

        <div>
          <Label value="Description" />
        
        <Textarea  type='number' defaultValue="description" required rows={4} {...register("description")}  placeholder="Please enter description"  />
        
{errors.cost_price && <span className=' text-red-400'>This field is required</span>}
        </div> 

       

<div  className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Image" />
      </div>
      <FileInput accept="image/*"    {...register("image", {
    onChange: (e) => {handleFileInputChange(e)},
    
  })}  helperText="Please upload a product image" />
      
      {imagePreview && (
        <div>
          <h3>Preview</h3>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}

      
    </div>



      
      
      
      
<div className=' col-span-2'>
      <Button><input type="submit" /></Button>
      </div>
    </form>
    </section>
  )
}

export default Addproduct