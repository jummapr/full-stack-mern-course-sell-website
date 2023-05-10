import { Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const CourseCard = ({
  views,
  title,
  image,
  id,
  Add_To_Playlist,
  creator,
  description,
  lectureCount,
}) => {

  const { loading, courses, error ,message} = useSelector(state => state.courses);

  return (
    <Course__Components>
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={image} boxSize="60" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
          size="sm"
        />
        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            children={'Creator'}
          />
          <Text
            fontFamily={'body'}
            textTransform={'uppercase'}
            children={creator}
          />
        </HStack>

        <Heading
          textTransform={'uppercase'}
          textAlign={'center'}
          size="xs"
          children={`Lectures - ${lectureCount}`}
        />
        <Heading
          textTransform={'uppercase'}
          size="xs"
          children={`Views - ${views}`}
        />

        <Stack direction={['column','row']} alignItems="center">
            <Link to={`/course/${id}`}>
              <Button colorScheme={'yellow'}>Watch Now</Button>
            </Link>
            {/* <Button isLoading={loading}  variant={'ghost'} colorScheme={'yellow'} onClick={() => Add_To_Playlist(id)}>Add To PlayList</Button> */}

        </Stack>
      </VStack>
    </Course__Components>
  );
};

const Course__Components = styled.div`

width: 250px;
margin-bottom: 1rem;
transition: all 0.5s;

&:hover {
  transform: translateY(-10px);
}
`

export default CourseCard;
