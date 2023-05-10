import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  VStack,
  Avatar,
  Input,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FilleUpload } from '../Styles/FilleUploadCss';
import { updateProfilePicture } from '../redux/Actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from '../redux/Actions/user';

const ChangePhoto = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    state => state.profile
  );
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState();

  const changeImage = e => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
      setImagePrev(render.result);
      setImage(file);
    };
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
  }, [dispatch, error, message]);

  const ChangeImageSubmitHandler =async (e,image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image)

   await dispatch(updateProfilePicture(myForm))
   dispatch(loadUser())
  }

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay backdropFilter={'blur(10px )'} />
        <ModalContent>
            <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={e => ChangeImageSubmitHandler(e, image)}>
                <VStack spacing={'8'}>
                  {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                  <Input
                    type={'file'}
                    css={{ '&::file-selector-button': FilleUpload }}
                    onChange={changeImage}
                  />
                  <Button isLoading={loading} w={'full'} colorScheme="yellow" type="submit">
                    Change
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button mr={'3'} onClick={closeHandler}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePhoto;
