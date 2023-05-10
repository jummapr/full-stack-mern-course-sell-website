import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  VStack,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { FilleUpload } from '../../../Styles/FilleUploadCss';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
  loading
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const ChangeVideoHandler = e => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
      setVideoPrev(render.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={'full'}
        onClose={closeHandler}
        scrollBehavior="outside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton onClick={onClose} />

          <ModalBody p={'16'}>
            <Grid templateColumns={['1fr', '3fr 1fr']}>
              <Box px={['0', '16']}>
                <Box my={'5'}>
                  <Heading children={courseTitle} />
                  <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
                </Box>

                <Heading children={'Lectures'} size={'lg'} />

                {lectures.map((item, i) => (
                  <VideoCard
                  key={i}
                    title={item.title}
                    description={item.description}
                    num={i + 1}
                    lectureId={item._id}
                    CourseId={id}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                  />
                ))}
              </Box>

              <Box>
                <form
                  onSubmit={e =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack
                    children={'Add Lecture'}
                    size={'md'}
                    textTransform={'uppercase'}
                  >
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <Input
                      accept="video/mp4"
                      type={'file'}
                      focusBorderColor="purple.300"
                      required
                      id="ChooseAvatar"
                      css={{
                        '&::file-selector-button': {
                          ...FilleUpload,
                          color: 'purple',
                        },
                      }}
                      onChange={ChangeVideoHandler}
                    />

                    {videoPrev && (
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPrev}
                      ></video>
                    )}

                    <Button isLoading={loading} w={'full'} colorScheme={'purple'} type={'submit'}>
                      Upload
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeHandler}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const VideoCard = ({
  title,
  description,
  num,
  lectureId,
  CourseId,
  deleteButtonHandler,
}) => {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteButtonHandler(CourseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
};

export default CourseModal;
