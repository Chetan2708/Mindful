import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import ProfileModal from "../misc/ProfileModal"

const MenuModel = ({user , handleLogout}) => {
  return (
    
        <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
    
  )
}

export default MenuModel