import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import video from '../../video/video.mp4';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourses } from '../../redux/Actions/course';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const CoursePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const LectureTitle = 'Lecture Title';
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.courses);
  useEffect(() => {
    dispatch(getCourses(params.id));
  }, [dispatch, params.id]);


  const { user } = useSelector(state => state.user);

  if (
    user.role !== 'admin' &&
    user.subscription === undefined || 
    user.subscription.status !== 'active'
  ) {
    // console.log(user.subscription, 'user subscription status');
    return <Navigate to={`/subscribe`} />;
  }

  // if (
  //   user.role === 'admin' &&
  //   user.subscription &&
  //   user.subscription.status === 'active'
  // ) {
  //   console.log(user.subscription, 'user subscription status');
  //   return <Navigate to={`/course/${params.id}`} />;
  // }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
          {lectures && lectures.length > 0 ? (
            <>
              <Box>
                <video
                  width={'100%'}
                  autoPlay
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  src={lectures[lectureNumber].video.url}
                ></video>

                <Heading
                  m={'4'}
                  children={`#${lectureNumber + 1} ${
                    lectures[lectureNumber].title
                  }`}
                />

                <Heading m={'4'} children="Description" />

                <Text m={'4'} children={lectures[lectureNumber].description} />
              </Box>
              <VStack>
                {lectures.map((element, index) => (
                  <button
                    onClick={() => setLectureNumber(index)}
                    key={element._id}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      textAlign: 'center',
                      margin: 0,
                      borderBottom: '1px solid rgba(0,0,0,0.2)',
                    }}
                  >
                    <Text noOfLines={1}>
                      #{index + 1} {element.title}
                    </Text>
                  </button>
                ))}
              </VStack>
            </>
          ) : (
            <Heading children={'No Lecture'} />
          )}
        </Grid>
      )}
    </div>
  );
};

export default CoursePage;
