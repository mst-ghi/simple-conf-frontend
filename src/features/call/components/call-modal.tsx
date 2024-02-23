import { useCall } from '..';
import { useEffect } from 'react';
import { IconPhoneCalling, IconPhoneX } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Flex,
  Modal,
  Text,
} from '@mantine/core';

interface CallModalProps {
  calling?: boolean;
  receiving?: boolean;
  onClose?: () => void;
}

const CallModal = ({ calling, receiving, onClose }: CallModalProps) => {
  const { initStates, call, callMode, stream, actions } = useCall();

  const close = () => {
    actions.streamOFF();
    actions.setStates(initStates);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (calling && Boolean(call.user?.id)) {
      actions.streamON({ video: false, audio: true });
      actions.audioCall();
    }
  }, [calling]);

  return (
    <Modal
      centered
      withOverlay
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      opened={
        (Boolean(calling) || Boolean(receiving)) && Boolean(call.user?.id)
      }
      onClose={close}
      size="xs"
    >
      <Card withBorder={false} h={360} onClick={close} py="md">
        <Center mb="lg">
          {stream !== undefined ? (
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

        <Flex direction="row" align="center" justify="space-around" gap="xl">
          {callMode === 'in' && (
            <ActionIcon color="green" size={72} radius="50%">
              <IconPhoneCalling size={36} stroke={3} />
            </ActionIcon>
          )}

          <ActionIcon color="red" size={72} radius="50%">
            <IconPhoneX size={36} stroke={3} />
          </ActionIcon>
        </Flex>
      </Card>
    </Modal>
  );
};

export default CallModal;
