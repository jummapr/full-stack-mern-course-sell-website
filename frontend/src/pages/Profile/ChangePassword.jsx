import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, updateProfile } from '../../redux/Actions/profile';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {loading,  message, error } = useSelector(
    state => state.profile
  );
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword,newPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <>
      <Container py={'16'} minH="90vh">
        <form onSubmit={submitHandler}>
          <Heading
            children="Change The Password"
            my={'16'}
            textAlign={['center', 'left']}
            textTransform="uppercase"
          />

          <VStack spacing={'8'}>
            <Input
              type={'password'}
              focusBorderColor="yellow.500"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              autoComplete="false"
            />

            <Input
              type={'password'}
              focusBorderColor="yellow.500"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              autoComplete="false"
            />
            <Button isLoading={loading} w={'full'} colorScheme="yellow" type='submit'>Change</Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ChangePassword;
