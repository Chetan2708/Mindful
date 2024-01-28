import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Badge, Box, Button, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Card from '../../UIElements/Card';
import './View.css'
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
    
      <VStack spacing={4}>
        {/* <Text fontSize="2xl" fontWeight="bold">
        User Details
      </Text>
      <HStack>
        <Badge colorScheme="green" fontSize="xl">
          ID: {id}
        </Badge>
      </HStack>
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
      {updateData.state && <Text>State: {updateData.state}</Text>} */}
           <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center" marginBottom="10px">
        User Details
      </Text>

      <div className="User">
        <Card className="User__content">
          <div className="User__image">
            <img src={updateData.pic} alt={updateData.name} />
          </div>
          <div className="User__info">
            {updateData.name && <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '10px' }}> Name: {updateData.name}</h1>}

            <Badge colorScheme="green" fontSize="xl">
              ID: {id}
            </Badge>

            {updateData.email && <Text fontWeight="bold" marginTop="5px">Email: {updateData.email}</Text>}
            {updateData.phone && <Text fontWeight="bold">Phone: {updateData.phone}</Text>}
            {updateData.gender && <Text fontWeight="bold">Gender: {updateData.gender}</Text>}
            {updateData.howHeard.length > 0 && updateData.howHeard[0].trim() !== "" && (
              <Text fontWeight="bold">How Heard: {updateData.howHeard.join(', ')}</Text>
            )}
            {updateData.city && <Text fontWeight="bold">City: {updateData.city}</Text>}
            {updateData.state && <Text fontWeight="bold">State: {updateData.state}</Text>}
          </div>
          <div className="User__actions">
            <Button colorScheme="whatsapp" onClick={handleEdit}>
              Edit User
            </Button>
            <Button colorScheme="red" onClick={handleClose} marginLeft="5px">
              Close
            </Button>
          </div>
        </Card>
      </div>
      </VStack>
   
  );
};

export default View