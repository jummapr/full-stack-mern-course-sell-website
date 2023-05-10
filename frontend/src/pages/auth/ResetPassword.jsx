import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import { resetPassword } from '../../redux/Actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {loading,  message, error } = useSelector(
    state => state.profile
  );
    const [password,setPassword] = useState("");
    const params = useParams() ;

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(resetPassword(params.token,password))
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
      <Container py={'16'} h="90vh">
        <form onSubmit={submitHandler}>
          <Heading
            children="Reset Your Password"
            my={'16'}
            textTransform="uppercase"
            textAlign={['center', 'left']}
          />
          <VStack spacing={'8'}>
            <Input
              type={'password'}
              focusBorderColor="yellow.500"
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter New Password"
              autoComplete="false"
            />
            <Button isLoading={loading} type='submit' w={'full'} colorScheme="yellow">Update Password</Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ResetPassword;