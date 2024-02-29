'use client';

import { useCall } from '..';
import { Fragment, useEffect, useRef } from 'react';
import {
  IconPhoneCalling,
  IconPhoneX,
  IconVideo,
  IconVideoOff,
  IconVolume,
  IconVolumeOff,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Modal,
  Text,
} from '@mantine/core';
import { useApp } from '@/hooks';

interface CallModalProps {
  calling?: boolean;
  receiving?: boolean;
  onClose?: () => void;
}

const CallModal = ({ calling, receiving, onClose }: CallModalProps) => {
  const { user } = useApp();
  const {
    call,
    callInfo,
    callAccepted,
    callMode,
    stream,
    remoteStream,
    tracks,
    actions,
  } = useCall();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const close = () => {
    // actions.streamOFF();
    // actions.reset();

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream;
    }
  }, [localVideoRef.current, stream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteVideoRef.current, remoteStream]);

  useEffect(() => {
    if (!stream && calling) {
      actions.streamON({ video: true, audio: true });
    }
    if (stream && calling && Boolean(call.user?.id)) {
      actions.calling();
    }
  }, [calling, stream]);

  return (
    <Modal
      centered
      withOverlay
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      opened={Boolean(calling) || Boolean(receiving)}
      onClose={close}
      size="xs"
    >
      <Card withBorder={false} h={360} py="md" pos="relative">
        {callAccepted && (
          <Fragment>
            <Card
              component="video"
              ref={remoteVideoRef}
              autoPlay
              shadow="xs"
              pos="absolute"
              w="100%"
              h={280}
              left={0}
              top={0}
              bottom={0}
              right={0}
            />

            <Card
              component="video"
              ref={localVideoRef}
              autoPlay
              shadow="xs"
              pos="absolute"
              px={4}
              py={0}
              top={4}
              right={4}
              h={80}
              w={80}
            />
          </Fragment>
        )}

        {!callAccepted && (
          <Fragment>
            <Center mb="lg">
              {Boolean(callInfo) ? (
                <Text size="xl" fw={600} c="blue">
                  {callMode === 'in' ? 'Incoming' : 'Outgoing'} Call...
                </Text>
              ) : (
                <Text size="xl" fw={600} c="gray.6">
                  Connecting...
                </Text>
              )}
            </Center>

            <Flex direction="column" align="center" h="100%">
              <Avatar size="xl" />
              <Text fw={600} size="lg" mt="md" tt="capitalize">
                {call.user?.name}
              </Text>
              <Text fw={300} size="sm">
                {call.user?.email}
              </Text>
            </Flex>
          </Fragment>
        )}

        <Box pos="absolute" bottom={0} left={0} right={0} w="100%" h={60}>
          <Flex direction="row" align="center" justify="space-around">
            {callMode === 'in' &&
              !callAccepted &&
              callInfo &&
              callInfo.toUser.id === user?.id && (
                <ActionIcon
                  color="green"
                  size={54}
                  radius="50%"
                  onClick={() => {
                    actions.acceptCall();
                  }}
                >
                  <IconPhoneCalling size={32} />
                </ActionIcon>
              )}

            {callAccepted && stream && (
              <Fragment>
                <ActionIcon
                  color={tracks.video ? 'blue' : undefined}
                  size={54}
                  radius="50%"
                  onClick={actions.toggleVideo}
                >
                  {tracks.video ? (
                    <IconVideo size={32} />
                  ) : (
                    <IconVideoOff size={32} />
                  )}
                </ActionIcon>

                <ActionIcon
                  color={tracks.audio ? 'blue' : undefined}
                  size={54}
                  radius="50%"
                  onClick={actions.toggleAudio}
                >
                  {tracks.audio ? (
                    <IconVolume size={32} />
                  ) : (
                    <IconVolumeOff size={32} />
                  )}
                </ActionIcon>
              </Fragment>
            )}

            <ActionIcon
              disabled={!Boolean(callInfo)}
              color="red"
              size={54}
              radius="50%"
              onClick={async () => {
                await actions.endCall();
                close();
              }}
            >
              <IconPhoneX size={32} />
            </ActionIcon>
          </Flex>
        </Box>
      </Card>
    </Modal>
  );
};

export default CallModal;
