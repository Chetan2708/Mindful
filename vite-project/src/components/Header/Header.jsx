import React, { useState } from 'react'
import {  Box, Input, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2';
import SideDrawer from '../Sidebar/SideDrawer';
import "./header.css"
import MenuModel from '../MenuModal/MenuModel';
import { setSearch, setTemp } from '../../features/inputSlice';
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const search = useSelector((state) => state.searchResult)
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleLogout = () => {
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
        localStorage.removeItem("filters");
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

  const handleChange = (value) => {
    localStorage.setItem("filters", value)
    dispatch(setTemp(uuid()))
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
              width={'20%'}
            />

          </Tooltip>

          <Text fontSize="2xl" fontFamily="Work sans" >
            Dashboard
          </Text>
          <div >
            <Button style={{ marginRight: '20px' }} background={'transparent'} onClick={onOpen}>
              <SettingsIcon />
            </Button>
            <MenuModel user={user} handleLogout={handleLogout}/> {/* Single Component  ........ New change*/}
          </div>
        </Box>
        <Link to="/dashboard/add">
          <Button colorScheme='' variant='outline' margin={'20px'} width={'10%'} gap={'10px'} className='Add-user-btn'>
            <span className="btn-txt"> Add User</span> <AddIcon />
          </Button>
        </Link>
      </header>
      <SideDrawer isOpen={isOpen} onClose={onClose} handleChange={handleChange} />  {/* Single Component  ........ New change*/}

    </>
  )
}

export default Header