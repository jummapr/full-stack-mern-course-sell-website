import { Button } from '@chakra-ui/react'
import { RiDashboardFill } from 'react-icons/ri'
import {Link} from 'react-router-dom'

const LinkButton = ({url,Icon,text,active}) => {
  return (
    <>
      <Link to={`/admin/${url}`}>
          <Button fontSize={'larger'} variant="ghost" colorScheme={active? 'purple':''}>
            <Icon style={{margin: "4px"}}/>
            {text}
          </Button>
        </Link>
    </>
  )
}

export default LinkButton
