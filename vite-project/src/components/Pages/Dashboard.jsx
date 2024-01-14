import React, { useEffect, useState } from 'react';
import Header from '../Header';
import List from '../List';
import { Box, Center, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../features/inputSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setUserData } from '../../features/inputSlice';
import { Spinner } from '@chakra-ui/react'
const Dashboard = () => {
  const [temp, setTemp] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    dispatch(setUserData(userInfo));
    if (!userInfo){
      navigate("/")
    }
    const fetchData = async () => {
  
      try {
        setLoading(true);
        if (!navigator.onLine) {
        
          toast({
            title: 'No Internet Connection',
            description: 'Please check your Wi-Fi or Mobile Data',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`/api/user?search`, config);

        dispatch(setAllUsers(response.data));
        setLoading(false)
      } catch (error) {
          console.log(error)
          
      }
    };

    fetchData();

  }, [temp, dispatch, user.token , navigate]);

  const handleEdit = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/dashboard/view/${id}`);
  };

  const handleDelete = async (id) => {
    // Display confirmation dialog 
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    // Check if the user confirmed the deletion
    if (confirmResult.isConfirmed) {
      try {
        // Check if the browser is online
        if (!navigator.onLine) {
          // Display a message or trigger a Snackbar for no internet connection
          toast({
            title: 'No Internet Connection',
            description: 'Please check your Wi-Fi or Mobile Data',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
          });
          return;
        }

        const response = await fetch(`/api/user/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // You might need to include additional headers such as authorization headers
          },
        });

        if (response.ok) {
          console.log('User deleted successfully');
          setTemp(true);

          // Display success message using SweetAlert
          Swal.fire({
            title: 'Deleted!',
            text: 'Your user has been deleted.',
            icon: 'success',
          });
        } else {
          console.error('Failed to delete user');

          // Display error message using SweetAlert
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete user.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error during delete request:', error.message);

        // Display error message using SweetAlert
        Swal.fire({
          title: 'Error',
          text: `Error during delete request: ${error.message}`,
          icon: 'error',
        });
      }
    }
  };

  return (
    <Box>
      <Header />
      {loading ? ( 
       <Center height="100vh">
       <Spinner
         thickness="6px"
         speed="0.65s"
         emptyColor="gray.200"
         color="blue.500"
         size="xl"
       />
     </Center>
      ) : (
        <List handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}
    </Box>
  );
};

export default Dashboard;