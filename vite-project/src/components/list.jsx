import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const List = ({ handleEdit, handleDelete, handleView }) => {
  const allData = useSelector((state) => state.allUsers)
  const search = useSelector((state) => state.searchResult)
  return (
    <div>
      <TableContainer style={{ color: 'white' }}>
        <Table size='m'>
          <Thead>
            <Tr>
              <Th width='5%'>Id</Th>
              <Th width='10%'>Name</Th>
              <Th width='10%'>Email</Th>
              <Th width='10%'>Phone number</Th>
              <Th width='5%' colSpan={3} >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allData.length > 0 ? (
              allData
                .filter((item) =>
                  search.toLowerCase() === "" ||
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase()) ||
                  item.phone.toLowerCase().includes(search.toLowerCase())
                ).map((emp, i) => (
                  <Tr
                    key={emp.id}
                    bg={i % 2 === 0 ? 'black' : 'grey.200 '} // Alternating background colors
                  >
                    <Td>{i + 1}</Td>
                    <Td>{emp.name}</Td>
                    <Td>{emp.email}</Td>
                    
                    <Td>{emp.phone}</Td>
                    <Td>
                      <Button
                        colorScheme='green'
                        onClick={() => handleEdit(emp._id)}
                      >
                        <EditIcon/>
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme='red'
                        margin={10}
                        onClick={() => handleDelete(emp._id)}
                      >
                       <DeleteIcon />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme='blue'
                        margin={10}
                        onClick={() => handleView(emp._id)}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))
            ) : (
              <Tr>
                <Td colSpan={7}>No Data Found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default List