import React, { useState } from 'react'
import { Avatar, Box, Input, Menu, MenuButton, MenuItem, MenuList, Radio, RadioGroup, Select, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setSelectedOption } from '../features/inputSlice';
import ProfileModal from './misc/ProfileModal';
import Swal from 'sweetalert2';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
const Header = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const search = useSelector((state)=> state.searchResult)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  
  const handleLogout =()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userInfo");
        Swal.fire({
          title: "Logged Out!",
          text: "You are logged out!",
          icon: "success"
        });
      }
      navigate("/");
    });
  }
  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
    
  };

  const handleChange =(value)=>{
    dispatch(setSelectedOption(value))
  }
  return (
<>
    <header>
         <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip hasArrow label="Search for Users" placement="bottom-end">
    
           <Input
      type="text"
      placeholder="Search (Name , Email , Phone )"
      onChange={handleSearchChange}
      value={search}
      px="4"
      width={'30%'}
    />
    
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Dashboard
        </Text>
        <div >
          <Button style={{marginRight:'20px'}} background={'transparent'} onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Link to="/dashboard/add">
        <Button colorScheme='teal' variant='outline' margin={'20px'} width={'10%'} gap={'10px'}>
         Add User <AddIcon/>
        </Button>
      </Link>
    </header>
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Filter </DrawerHeader>
          <DrawerBody>
          
            <RadioGroup onChange={handleChange}>
          <Stack direction={'column'} >
              <Radio value='A-Z'>A-Z</Radio>
              <Radio value='Z-A'>Z-A</Radio>
              <Radio value='lastModified'>Last Modified</Radio>
              <Radio value='lastInserted'>Last Inserted</Radio>
          </Stack>
            </RadioGroup>
          
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    
    </>
  )
}

export default Header