import { Card, CardProps, Center, Flex, ScrollArea } from '@mantine/core';
import { ConfUserCard } from '.';
import useApp from '@/hooks/useApp';
import { IconDualScreen, IconScreenShare } from '@tabler/icons-react';

interface ConfContentPros extends CardProps {}

const ConfContent = ({
  mx = 'xl',
  h = '70vh',
  bg = 'transparent',
  mt = 'md',
  withBorder = false,
  ...props
}: ConfContentPros) => {
  const { screenSharingStatus } = useApp();

  return (
    <Card mx={mx} h={h} bg={bg} mt={mt} withBorder={withBorder} {...props}>
      {screenSharingStatus && (
        <Center h="100%">
          <IconScreenShare size={120} color="gray" />
        </Center>
      )}
      {!screenSharingStatus && (
        <ScrollArea
          h="100%"
          type="always"
          scrollbarSize={10}
          styles={{
            viewport: {
              paddingBottom: 10,
              paddingTop: 2,
            },
          }}
        >
          <Flex
            direction="row"
            align="center"
            justify="center"
            gap="sm"
            wrap="wrap"
            p="lg"
            h="100%"
          >
            <ConfUserCard name="Mostafa" w={220} h={220} />
            <ConfUserCard name="Mostafa" w={220} h={220} />
          </Flex>
        </ScrollArea>
      )}
    </Card>
  );
};

export default ConfContent;
