import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/Actions/course';
import toast from 'react-hot-toast';
import { AddToPlayListCourses } from '../../redux/Actions/user';

const Courses = () => {
  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState('');
  const [category, setCategory] = useState('');
  
  const AddPlayListHandler = courseId => {
    dispatch(AddToPlayListCourses(courseId))
  };

  const categories = [
    'web developer',
    'mern developer',
    'nodejs developer',
    'javaScript developer',
    'Python developer',
    'Game developer',
  ];

  

  const { loading, courses, error ,message} = useSelector(state => state.courses);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses(category, inputVal));
  }, [category, inputVal, dispatch, error,message]);

  
  return (
    <>
      <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
        <Heading children="All Courses" m={'8'} />

        <Input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Search A Courses.."
          type={'text'}
          focusBorderColor="yellow.500"
        />

        <HStack
          overflowX={'auto'}
          paddingY="8"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {categories.map((item, index) => (
            <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <Stack
          direction={['column', 'row']}
          flexWrap="wrap"
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          {courses.length > 0 ? 
            courses.map(course => (
              <CourseCard
              key={course._id}
                title={course.title}
                description={course.description}
                views={course.views}
                image={course.poster.url}
                id={course._id}
                creator={course.createdBy}
                lectureCount={course.numOfVideos}
                Add_To_Playlist={AddPlayListHandler}
              />
            )) : <Heading  mt={'4'} children={"Course Not Found"}/>}
        </Stack>
      </Container>
    </>
  );
};

export default Courses;

