import React from 'react'
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { Trash2  } from 'lucide-react';
import toast from 'react-hot-toast';

function Deletemodal({id}) {
    const [openModal, setOpenModal] = useState(false);
    const deleteProduct=async(id)=>{
        try {
            const formData = new FormData();
            formData.append('id', id);
            const response=await axios.delete(`http://localhost:5000/deleteproduct`,{
                id
            })
            // fetchdata()
            if(response.data.data.acknowledged){
              toast.success("Product Edited successfully")
            }else{
              toast.success("Something went wrong")
            }
            
        } catch (error) {
            console.log(error);
        }
       
    }
  return (
    <>
    <Button onClick={()=>setOpenModal(true)} className='h-8 w-8 text-red-500'><Trash2  className='h-5 w-5'/></Button>
    
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
    <Modal.Header>Confirm</Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Are you sure you want to delete product
        </p>
     
      </div>
    </Modal.Body>
    <Modal.Footer>
      {/* <Button onClick={() => setOpenModal(false)}>Delete</Button> */}
      <Button  onClick={()=>deleteProduct(id)}>Delete</Button>
      <Button color="gray" onClick={() => setOpenModal(false)}>
        Decline
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
}

export default Deletemodal