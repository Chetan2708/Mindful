import React, { useState } from 'react'
import { Avatar, Box, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/inputSlice';
import ProfileModal from './misc/ProfileModal';

const Header = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const search = useSelector((state)=> state.searchResult)
  
  
  const handleLogout =()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
    
  };
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
        <div>
  
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
        <Button colorScheme='teal' variant='outline' margin={'20px'} width={'30%'}>
          Add User
        </Button>
      </Link>
    </header>
    
    </>
  )
}

export default Header