import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    Text,
    Image,
  } from "@chakra-ui/react";
  
  import { useDisclosure } from "@chakra-ui/hooks";
  import { ViewIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
  
  const ProfileModal = ({children }) => {
    const user = useSelector((state)=>state.userData)
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
  
        {children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{user.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
            >
  
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
              <Text
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
              >
                Email: {user.email}
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={5} onClick={onClose}>
                Close
              </Button>
  
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ProfileModal;
  