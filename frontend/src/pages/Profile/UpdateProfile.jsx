import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/Actions/profile';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from '../../redux/Actions/user';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    state => state.profile
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  

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

  const submitHandler = async(e) => {
    e.preventDefault();
   await dispatch(updateProfile(name,email));
   dispatch(loadUser())
  }
  return (
    <>
      <Container py={'16'} minH="90vh">
        <form onSubmit={submitHandler}>
          <Heading
            children="Update Profile"
            my={'16'}
            textAlign={['center', 'left']}
            textTransform="uppercase"
          />

          <VStack spacing={'8'}>
            <Input
              type={'text'}
              focusBorderColor="yellow.500"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              autoComplete="false"
            />

            <Input
              type={'email'}
              focusBorderColor="yellow.500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="false"
            />
            <Button isLoading={loading} w={'full'} colorScheme="yellow" type="submit">
              Update
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default UpdateProfile;
