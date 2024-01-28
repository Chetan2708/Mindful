import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Badge, Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
const View = () => {
  const allData = useSelector((state) => state.allUsers);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    howHeard: [],
    city: '',
    state: '',
  });

  useEffect(() => {
    // Fetch existing user data (excluding password) and populate updateData state
    const currentUser = allData.find((user) => user._id === id);
    if (currentUser) {
      const { password, ...userDataWithoutPassword } = currentUser;
      setUpdateData(userDataWithoutPassword);
    }
  }, [id, allData]);
  
  const handleEdit = () => {
    navigate(`/dashboard/edit/${id}`);
  };
  const handleClose = () => {
    navigate('/dashboard');
  };
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" style={{ color: 'white' }}>
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        User Details
      </Text>
      <HStack>
        <Badge colorScheme="green" fontSize="xl">
          ID: {id}
        </Badge>
      </HStack>
      {console.log(updateData)}
      {updateData.name && <Text>Name: {updateData.name}</Text>}
      {updateData.pic && (
        <Image borderRadius="full" boxSize="150px" src={updateData.pic} alt={updateData.name} />
      )}
      {updateData.email && <Text>Email: {updateData.email}</Text>}
      {updateData.phone && <Text>Phone: {updateData.phone}</Text>}
      {updateData.gender && <Text>Gender: {updateData.gender}</Text>}
      {updateData.howHeard.length > 0 && updateData.howHeard[0].trim() !== "" && (
  <Text>How Heard: {updateData.howHeard.join(', ')}</Text>
)}
      {updateData.city && <Text>City: {updateData.city}</Text>}
      {updateData.state && <Text>State: {updateData.state}</Text>}
      <Button colorScheme="whatsapp" width={'10%'} onClick={handleEdit}>
        Edit User
      </Button>
      <Button colorScheme="red" width={'10%'} onClick={handleClose}>
        Close
      </Button>
    </VStack>
  </Box>
  );
};

export default View