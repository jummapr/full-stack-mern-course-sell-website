import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '@chakra-ui/react';

const NavbarLinksList = ({url='/',title="Home",onClose}) => {
  return (
    <>
      <Link onClick={onClose} to={url}>
        <Button variant={'ghost'} >{title}</Button>
      </Link>
    </>
  );
};

export default NavbarLinksList;
