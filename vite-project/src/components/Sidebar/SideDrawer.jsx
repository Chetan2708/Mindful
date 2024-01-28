import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const SideDrawer = ({ isOpen, onClose, handleChange }) => {
  return (
    <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Filter</DrawerHeader>
        <DrawerBody>
          <RadioGroup onChange={handleChange} value={useSelector((state) => state.val)}> 
            <Stack direction={'column'}>
              <Radio value='A-Z'>A-Z</Radio>
              <Radio value='Z-A'>Z-A</Radio>
              <Radio value='lastModified'>Last Modified</Radio>
              <Radio value='lastInserted'>Last Inserted</Radio>
            </Stack>
          </RadioGroup>
        </DrawerBody>
        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
