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

const List = ({ handleEdit ,handleDelete ,handleView }) => {
    const allData = useSelector((state)=>state.allUsers) 
    return (
        <div>
          <TableContainer>
            <Table size='m'>
              <Thead>
                <Tr>
                  <Th width='5%'>Id</Th>
                  <Th width='10%'>Name</Th>
                  <Th width='10%'>Email</Th>
                  <Th width='10%'>City</Th>
                  <Th width='10%'>Phone number</Th>
                  <Th width='5%' colSpan={3}>
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {allData.length > 0 ? (
                  allData.map((emp, i) => (
                    <Tr
                      key={emp.id}
                      bg={i % 2 === 0 ? 'black' : 'grey.200 '} // Alternating background colors
                    >
                      <Td>{i + 1}</Td>
                      <Td>{emp.name}</Td>
                      <Td>{emp.email}</Td>
                      <Td>{emp.city}</Td>
                      <Td>{emp.phone}</Td>
                      <Td>
                        <Button
                          colorScheme='gray'
                          onClick={() => handleEdit(emp._id)}
                        >
                          Edit
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme='gray'
                          margin={10}
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme='gray'
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
                    <Td colSpan={7}>No Employees</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      );
}

export default List