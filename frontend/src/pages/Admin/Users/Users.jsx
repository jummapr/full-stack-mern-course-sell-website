import {
  Box,
  Grid,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
// import Row from '../../../components/Row';
import SideBar from '../SideBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUser,
  updateUserRole,
} from '../../../redux/Actions/Admin';
import { toast } from 'react-hot-toast';

const Users = () => {
  const { users, loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const updateHandler = userId => {
    dispatch(updateUserRole(userId));
  };
  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    dispatch(getAllUser());


    if (error) {
      toast.success("User Delete SuccessFully!");
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <>
      <Grid
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
        css={{
          cursor: 'url(),default',
        }}
      >
        <Box p={['0', '16']} overflowX={'auto'}>
          <Heading
            textTransform={'uppercase'}
            children={'All Users'}
            my={'16'}
            textAlign={['center', 'left']}
          />

          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All Available Users in The Database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users &&
                  users.map(item => (
                    <Row
                      updateHandler={updateHandler}
                      deleteButtonHandler={deleteButtonHandler}
                      key={item._id}
                      item={item}
                      loading={loading}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <SideBar />
      </Grid>
    </>
  );
};

const Row = ({ item, updateHandler, deleteButtonHandler, loading }) => {
  return (
    <>
      <Tr>
        <Td>{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.role}</Td>
        <Td>
          {item.subscription && item.subscription.status === 'active'
            ? 'Active'
            : 'Not Active'}
        </Td>
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              onClick={() => deleteButtonHandler(item._id)}
              color={'purple.600'}
              isLoading={loading}
            >
              <RiDeleteBin7Fill />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
};

export default Users;
