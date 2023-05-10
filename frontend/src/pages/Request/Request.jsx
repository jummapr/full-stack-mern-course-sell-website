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
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/Actions/other';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();
  const {loading,error,message} =  useSelector(state => state.other)

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  },[dispatch,error,message])
  return (
    <>
      <Container h={'92vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children="Request The New Course" />

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
              <FormLabel htmlFor="course" children="Course" />
              <Textarea
                focusBorderColor="yellow.500"
                required
                id="course"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="Explain the Course"
                autoComplete="false"
              />
            </Box>

            <Button isLoading={loading} my={'4'} colorScheme="yellow" type="submit">
              Send Mail
            </Button>
            <Box my={'4'}>
              See Available Course!{' '}
              <Link to={'/courses'}>
                <Button colorScheme={'yellow'} variant="link">
                  Click
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Request;
