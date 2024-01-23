import useApp from '@/hooks/useApp';
import { ActionIcon, Flex } from '@mantine/core';
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconPhone,
  IconScreenShare,
  IconScreenShareOff,
  IconVideo,
  IconVideoOff,
} from '@tabler/icons-react';

const ConfActionBar = () => {
  const {
    micStatus,
    webcamStatus,
    screenSharingStatus,
    setMicStatus,
    setWebcamStatus,
    setScreenSharingStatus,
  } = useApp();

  return (
    <Flex
      pos="absolute"
      direction="row"
      align="center"
      justify="center"
      gap="md"
      bottom={16}
      left={16}
      right={16}
    >
      <ActionIcon
        size={64}
        radius="xl"
        color={micStatus ? 'grape' : 'dark'}
        onClick={() => setMicStatus(!micStatus)}
      >
        {micStatus ? (
          <IconMicrophone size={32} />
        ) : (
          <IconMicrophoneOff size={32} />
        )}
      </ActionIcon>

      <ActionIcon
        size={64}
        radius="xl"
        color={webcamStatus ? 'grape' : 'dark'}
        onClick={() => setWebcamStatus(!webcamStatus)}
      >
        {webcamStatus ? <IconVideo size={32} /> : <IconVideoOff size={32} />}
      </ActionIcon>

      <ActionIcon
        size={64}
        radius="xl"
        color={screenSharingStatus ? 'grape' : 'dark'}
        onClick={() => setScreenSharingStatus(!screenSharingStatus)}
      >
        {screenSharingStatus ? (
          <IconScreenShare size={32} />
        ) : (
          <IconScreenShareOff size={32} />
        )}
      </ActionIcon>

      <ActionIcon size={64} radius="xl" color="red">
        <IconPhone size={32} />
      </ActionIcon>
    </Flex>
  );
};

export default ConfActionBar;
