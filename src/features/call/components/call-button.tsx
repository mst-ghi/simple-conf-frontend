import { Fragment, useState } from 'react';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconPhone, TablerIconsProps } from '@tabler/icons-react';
import { CallModal } from '.';

interface CallButtonProps {
  actionIconProps?: ActionIconProps;
  iconProps?: TablerIconsProps;
}

const CallButton = ({ actionIconProps, iconProps }: CallButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <ActionIcon {...actionIconProps} onClick={() => setOpen(true)}>
        <IconPhone {...iconProps} />
      </ActionIcon>

      <CallModal calling={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default CallButton;
