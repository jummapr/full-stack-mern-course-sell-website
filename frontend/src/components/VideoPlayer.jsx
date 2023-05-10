import { Box } from '@chakra-ui/react'
import React from 'react'

const VideoPlayer = () => {
  return (
    <div>
      <Box>
      <video
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src=""
        ></video>
      </Box>
    </div>
  )
}

export default VideoPlayer
