import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FilleUpload } from '../../../Styles/FilleUploadCss';
import SideBar from '../SideBar';
import { createCourse } from '../../../redux/Actions/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CreateCourse = () => {

  const dispatch = useDispatch();
  const {loading,error,message} = useSelector(state => state.admin)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const categories = [
    'web developer',
    'mern developer',
    'nodejs developer',
    'javaScript developer',
    'Python developer',
    'Game developer',
  ];

  const ChangeImageHandler = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
        setImagePrev(render.result)
        setImage(file)
    }
}

const submitHandler = (e) => {
    //   title, description, category, createdBy,file
  e.preventDefault();

  const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
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
},[dispatch,error,message])

  return (
    <>
      <Grid
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
        css={{
          cursor: 'url(),default',
        }}
      >
        <Container py={'16'}>
          <form onSubmit={submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children={'Create Course'}
              my={'16'}
              textAlign={['center', 'left']}
            />

            <VStack m={'auto'} spacing={'8'}>
              <Input
                type={'text'}
                focusBorderColor="purple.300"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                autoComplete="false"
              />
              <Input
                type={'text'}
                focusBorderColor="purple.300"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                autoComplete="false"
              />
              <Input
                type={'text'}
                focusBorderColor="purple.300"
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                placeholder="Creator Name"
                autoComplete="false"
              />

              <Select
                focusBorderColor="purple.300"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value=""> Category</option>
                {
                  categories.map(item => (
                    <option value={item}>{item}</option>
                  ))
                }

              </Select>
              <Input
                accept='image/*'
                  type={'file'}
                  focusBorderColor="purple.300"
                  required
                  id="ChooseAvatar"
                  css={{
                    "&::file-selector-button": {
                      ...FilleUpload,
                      color: 'purple'
                    }
                  }}
                  onChange={ChangeImageHandler}
                />

                {imagePrev && (
                  <Image src={imagePrev} boxSize={'64'} objectFit={'contain'}/>
                )}


                <Button isLoading={loading} w={'full'} colorScheme={'purple'} type={'submit'}>Create</Button>
            </VStack>
          </form>
        </Container>
        <SideBar />
      </Grid>
    </>
  );
};

export default CreateCourse;
