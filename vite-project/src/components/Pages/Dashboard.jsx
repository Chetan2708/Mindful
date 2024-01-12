import React ,{useEffect, useState} from 'react'
import Header from '../Header'

import List from '../list'
import { Box , useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllUsers } from '../../features/inputSlice'
const Dashboard = () => {
  
  const[selectedUser, setSelectedUser] = useState(null)
  const[isEditing , setisEditing] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.userData) 
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(
          `/api/user?search`,
          config
        );
        console.log(user.token);
        
        dispatch(setAllUsers(response.data))
      
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to Load",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
  
    fetchData(); // Call the async function
  
  }, []); 
  
  

  const handleEdit = () =>{
    
  }
  const handleDelete = () =>{

  }
  return (
    <Box>
          {
            (
              <>
              <Header/>
              
              <List
              //Users  data 
               handleEdit ={handleEdit}
              handleDelete = {handleDelete}
              />
              </>
            ) 

          }
      
   
    </Box>
  )
}

export default Dashboard