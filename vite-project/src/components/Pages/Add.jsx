import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Add = ({setisAdding}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [howHeard, setHowHeard] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const HandleClick = async () => {
    setLoad(true);
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let { data } = await axios.post(
        "/api/user/addUser",
        {
          name,
          email,
          password,
          phone,
          gender, 
          howHeard, 
          city, 
          state,
        },
        config
      );


      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoad(false);
      console.log(data)
      setisAdding(false)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoad(false);
    }
  }
  return (
    <VStack spacing="5px">

      <FormControl id="name" isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name (Alphabets only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setName(e.target.value.replace(/[^A-Za-z]/g, ''))}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email (Alphanumeric only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setEmail(e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ''))}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel> Phone</FormLabel>
        <Input
          placeholder="Enter Your Phone Number (Numbers only)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
        ></Input>
      </FormControl>

      <FormControl id="gender" isRequired>
        <FormLabel> Gender</FormLabel>
        <RadioGroup onChange={setGender} value={gender}>
          <HStack spacing="24px">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="others">Others</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl id="how-heard" isRequired>
        <FormLabel> How did you hear about this?</FormLabel>
        <CheckboxGroup onChange={setHowHeard} value={howHeard}>
          <HStack spacing="24px">
            <Checkbox value="linkedin">LinkedIn</Checkbox>
            <Checkbox value="friends">Friends</Checkbox>
            <Checkbox value="job-portal">Job Portal</Checkbox>
            <Checkbox value="others">Others</Checkbox>
          </HStack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="city" isRequired>
        <FormLabel> City</FormLabel>
        <Select
          placeholder="Select City"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="mumbai">Mumbai</option>
          <option value="pune">Pune</option>
          <option value="ahmedabad">Ahmedabad</option>
        </Select>
      </FormControl>

      <FormControl id="state" isRequired>
        <FormLabel> State</FormLabel>
        <Input
          placeholder="Enter Your State (Auto-suggested)"
          _placeholder={{ opacity: 0.5, color: 'black' }}
          onChange={(e) => setState(e.target.value)}
        ></Input>
        {/* You may implement auto-suggested functionality here based on the provided static values */}
      </FormControl>

      <Button
        colorScheme="whatsapp"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={HandleClick}
        isLoading={load}
        background="green.400"
        color='white'
      >
        Save
      </Button>
      <Button
        width="50%"
        style={{ marginTop: 15 }}
        onClick={()=>setisAdding(true)}
        isLoading={load}
        background="green.400"
        color='white'>
          Cancel
      </Button >

    </VStack>

  )
}

export default Add