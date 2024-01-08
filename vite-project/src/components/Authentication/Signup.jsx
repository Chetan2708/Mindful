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
} from '@chakra-ui/react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [howHeard, setHowHeard] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [load, setLoad] = useState(false); // assuming load is a boolean
  // const toast = useToast(); // assuming you want to use Chakra UI's toast for notifications

  const submitHandler = () => {
    // Implement your form submission logic here
    // You can access the form data using the state variables (name, email, phone, etc.)
    // You may also want to add validation logic before submitting the form

    // Example of showing a success toast:
    // toast({
    //   title: 'Form submitted successfully!',
    //   status: 'success',
    //   duration: 3000,
    //   isClosable: true,
    // });
  };

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
      width="100%"
      style={{ marginTop: 15 }}
      onClick={submitHandler}
      isLoading={load}
      background="green.400"
      color='white'
    >
      Save
    </Button>
  
  </VStack>
  
  )
}

export default Signup