import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/Actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  }

  return (
    <div>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'welcome to JummaAcdemy'} />
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
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
              <FormLabel htmlFor="password" children="Password" />
              <Input
                type={'password'}
                focusBorderColor="yellow.500"
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
              />
            </Box>
            <Box>
              <Link to="/forgetpassword">
                <Button fontSize={'sm'} variant="link">
                  Forget Password
                </Button>
              </Link>
            </Box>
            <Button my={'4'} colorScheme="yellow" type="submit">
              Login
            </Button>
            <Box my={'4'}>
              New User ?{' '}
              <Link to={'/register'}>
                <Button colorScheme={'yellow'} variant="link">
                  Sing Up
                </Button> {" "}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </div>
  );
};

export default Login;
