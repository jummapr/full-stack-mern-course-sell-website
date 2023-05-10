import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { contactUs } from '../../redux/Actions/other';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {loading,error,message:otherMessage} =  useSelector(state => state.other)

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name,email,message))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (otherMessage) {
      toast.success(otherMessage);
      dispatch({ type: 'clearMessage' });
    }
  },[dispatch,error,otherMessage])

  return (
    <>
      <Container h={'92vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children="Contact Us" />

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                type={'text'}
                focusBorderColor="yellow.500"
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter the Name"
                autoComplete="false"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
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
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="message" children="Message" />
              <Textarea
                focusBorderColor="yellow.500"
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="message"
                autoComplete="false"
              />
            </Box>

            <Button isLoading={loading} my={'4'} colorScheme="yellow" type="submit">
              Send Mail
            </Button>
            <Box my={'4'}>
             Request for a Course ?{' '}
              <Link to={'/request'}>
                <Button colorScheme={'yellow'} variant="link">
                  Click
                </Button> {" "}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Contact;
