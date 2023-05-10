import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilleUpload } from '../../Styles/FilleUploadCss';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterForm } from '../../redux/Actions/user';

const filleUpload = {
  '&::file-selector-button': FilleUpload,
};

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const { loading } = useSelector(state => state.user);

  const ChangeImageHandler = e => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
      setImagePrev(render.result);
      setImage(file);
    };
  };
  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(RegisterForm(myForm));
  };
  return (
    <div>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading
            marginTop={'28'}
            textTransform={'uppercase'}
            children={'Registration'}
          />
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'} display="flex" justifyContent={'center'}>
              <Avatar src={imagePrev} size={'2xl'} />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                type={'text'}
                focusBorderColor="yellow.500"
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Your Name"
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
            <Box my={'4'}>
              <FormLabel htmlFor="ChooseAvatar" children="ChooseAvatar" />
              <Input
                accept="image/*"
                type={'file'}
                focusBorderColor="yellow.500"
                required
                id="ChooseAvatar"
                css={filleUpload}
                onChange={ChangeImageHandler}
              />
            </Box>
            <Button
              isLoading={loading}
              my={'4'}
              colorScheme="yellow"
              type="submit"
            >
              Sing Up
            </Button>
            <Box my={'4'}>
              Already Signed Up ?{' '}
              <Link to={'/login'}>
                <Button colorScheme={'yellow'} variant="link">
                  Login
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </div>
  );
};

export default Register;
