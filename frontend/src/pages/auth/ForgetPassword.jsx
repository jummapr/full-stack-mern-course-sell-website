import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { forgetPassword } from '../../redux/Actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const {loading,  message, error } = useSelector(
    state => state.profile
  );
    const [email,setEmail] = useState("")

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email))
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
            children="Forget Password"
            my={'16'}
            textTransform="uppercase"
            textAlign={['center', 'left']}
          />
          <VStack spacing={'8'}>
            <Input
              type={'email'}
              focusBorderColor="yellow.500"
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              autoComplete="false"
            />
            <Button isLoading={loading} type='submit' w={'full'} colorScheme="yellow">Send Reset Password Link</Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ForgetPassword;
