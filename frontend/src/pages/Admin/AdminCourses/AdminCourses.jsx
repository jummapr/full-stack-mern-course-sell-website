import {
  Box,
  Grid,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import SideBar from '../SideBar';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourses } from '../../../redux/Actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/Actions/Admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const {courses,lectures} =  useSelector(state => state.courses)
  const {loading,error,message} =  useSelector(state => state.admin)
  const dispatch = useDispatch()
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId,setCourseId] = useState()
  const [courseTitle,setCourseTitle] = useState()


  const CourseDetailedHandler = (courseId,title) => {
    dispatch(getCourses(courseId))
    onOpen();
    setCourseId(courseId)
    setCourseTitle(title)
  };
  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId))
  };

  const deleteLectureButtonHandler = async(courseId, lectureId) => {
   await dispatch(deleteLecture(courseId,lectureId))
   dispatch(getCourses(courseId))
  };
  const addLectureHandler = async(e,courseId,title,description,video) => {
    e.preventDefault()
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

  await  dispatch(addLecture(courseId,myForm));
dispatch(getCourses(courseId))
  }

  useEffect(() => {
    dispatch(getAllCourses())
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
        <Box p={['0', '8']} overflowX={'auto'}>
          <Heading
            textTransform={'uppercase'}
            children={'All Users'}
            my={'16'}
            textAlign={['center', 'left']}
          />

          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All Available Courses in The Database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>poster</Th>
                  <Th>Title</Th>
                  <Th>category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses.map(item => (
                  <Row
                    CourseDetailedHandler={CourseDetailedHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                    loading={loading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <CourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
          />
        </Box>
        <SideBar />
      </Grid>
    </>
  );
};

const Row = ({ item, CourseDetailedHandler, deleteButtonHandler,loading }) => {
  return (
    <>
      <Tr>
        <Td>{item._id}</Td>
        <Td>
          <Image src={item.poster.url} />
        </Td>
        <Td>{item.title}</Td>
        <Td textTransform={'uppercase'}>{item.category}</Td>
        <Td>{item.createdBy}</Td>
        <Td isNumeric>{item.Views}</Td>
        <Td isNumeric>{item.numOfVideos}</Td>
        {/* <Td isNumeric>{item.Action}</Td> */}

        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              onClick={() => CourseDetailedHandler(item._id,item.title)}
              variant={'outline'}
              color={'purple.500'}
              isLoading={loading}
            >
              Views lector
            </Button>
            <Button
              onClick={() => deleteButtonHandler(item._id)}
              color={'purple.600'}
              isLoading={loading}
            >
              <RiDeleteBin7Fill />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
};

export default AdminCourses;
