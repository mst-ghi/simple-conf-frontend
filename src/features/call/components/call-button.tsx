import Peer from 'simple-peer';
import { Fragment, useEffect, useState } from 'react';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { CallModal } from '.';
import { useCall } from '..';

import {
  IconAlertCircle,
  IconVideo,
  TablerIconsProps,
} from '@tabler/icons-react';

interface CallButtonProps {
  actionIconProps?: ActionIconProps;
  iconProps?: TablerIconsProps;
}

const CallButton = ({ actionIconProps, iconProps }: CallButtonProps) => {
  const { callInfo, userMediaError } = useCall();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!callInfo?.fromRoomId) {
      setOpen(false);
    }
  }, [callInfo]);

  useEffect(() => {
    if (userMediaError) {
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [userMediaError]);

  return (
    <Fragment>
      <ActionIcon
        {...actionIconProps}
        onClick={() => {
          if (Peer.WEBRTC_SUPPORT) {
            setOpen(true);
          } else {
            showNotification({
              icon: <IconAlertCircle />,
              color: 'red',
              message: 'WebRTC is not supporting on your browser',
            });
          }
        }}
      >
        <IconVideo {...iconProps} />
      </ActionIcon>

      <CallModal calling={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default CallButton;
