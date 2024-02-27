import { Fragment, useEffect, useState } from 'react';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconVideo, TablerIconsProps } from '@tabler/icons-react';
import { CallModal } from '.';
import { useCall } from '..';

interface CallButtonProps {
  actionIconProps?: ActionIconProps;
  iconProps?: TablerIconsProps;
}

const CallButton = ({ actionIconProps, iconProps }: CallButtonProps) => {
  const { callInfo } = useCall();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!callInfo?.fromRoomId) {
      setOpen(false);
    }
  }, [callInfo]);

  return (
    <Fragment>
      <ActionIcon {...actionIconProps} onClick={() => setOpen(true)}>
        <IconVideo {...iconProps} />
      </ActionIcon>

      <CallModal calling={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default CallButton;
