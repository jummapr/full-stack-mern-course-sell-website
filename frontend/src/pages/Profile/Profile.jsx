import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ChangePhoto from '../../components/ChangePhoto';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, loadUser } from '../../redux/Actions/user';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Profile = ({user}) => {
  const dispatch = useDispatch();

  const {  message:subscriptionMessage, error:subscriptionError, loading: subscriptionLoading } = useSelector(
    state => state.subscription
  );

  const removeFromPlayHandler = (id) => {
    console.log(id);
  };

  const ChangeImageSubmitHandler = (e,image) => {
    // e.preventDefault();
    // const myForm = new FormData();
    // myForm.append("file", image)

    // dispatch(updateProfilePicture(myForm))
  }

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription())
  }

  useEffect(() => {
    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser())
    }
  }, [dispatch, subscriptionError, subscriptionMessage]);

  const {isOpen,onClose,onOpen} = useDisclosure()
  return (
    <>
      <Container minH={'95vh'} maxW="container.lg" py={'8'}>
        <Heading children="Profile" m={'8'} textTransform="uppercase" />
        <Stack
          justifyContent={'flex-start'}
          direction={['column', 'row']}
          alignItems="center"
          spacing={['8', '16']}
          padding="8"
        >
          <VStack>
            <Avatar boxSize={'48'} src={user.avatar.url}/>
            <Button onClick={onOpen} colorScheme={'yellow'} variant="ghost">
              Change Photo
            </Button>
          </VStack>

          <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
            <HStack>
              <Text children="Name" fontWeight={'bold'} />
              <Text children={user.name} />
            </HStack>
            <HStack>
              <Text children="Email" fontWeight={'bold'} />
              <Text children={user.email} />
            </HStack>
            <HStack>
              <Text children="CreatedAt" fontWeight={'bold'} />
              <Text children={user.createdAt.split('T')[0]} />
            </HStack>
            {user.role !== 'admin' && (
              <HStack>
                <Text children="subscription" fontWeight={'bold'} />

                {user.subscription && user.subscription.status === 'active' ? (
                  <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} color={'yellow.500'} variant="unstyled">
                    Cancel Subscription
                  </Button>
                ) : (
                  <Link to={'/subscribe'}>
                    <Button colorScheme={'yellow'}>Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}
            <Stack direction={['column', 'row']} alignItems="center">
              <Link to={'/updateprofile'}>
                <Button>Update Profile</Button>
              </Link>
              <Link to={'/changepassword'}>
                <Button>Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>

        <Heading children="PlayliSt" size={'md'} my={'8'} />
        {user.playlist.length > 0 && (
          <Stack
            direction={['column', 'row']}
            alignItems="center"
            flexWrap={'wrap'}
            p="4"
          >
            {user.playlist.map((element, index) => (
              <VStack w={'48'} m="2" key={element.course}>
                <Image
                  boxSize={'full'}
                  objectFit={'contain'}
                  src={element.poster}
                />
                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button variant={'ghost'} colorScheme="yellow">
                      Watch Now
                    </Button>
                  </Link>

                  <Button onClick={() => removeFromPlayHandler(element.course)}>
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Stack>
        )}

        <ChangePhoto isOpen={isOpen} onClose={onClose} ChangeImageSubmitHandler={ChangeImageSubmitHandler}/>
      </Container>
    </>
  );
};

export default Profile;
