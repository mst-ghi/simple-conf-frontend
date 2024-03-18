import { Card, CardProps, Center, Flex, ScrollArea } from '@mantine/core';
import { ConferenceUserCard } from '.';
import useApp from '@/hooks/useApp';
import { IconScreenShare } from '@tabler/icons-react';

interface ConferenceContentPros extends CardProps {}

const ConferenceContent = ({
  mx = 'xl',
  h = '70vh',
  bg = 'transparent',
  mt = 'md',
  withBorder = false,
  ...props
}: ConferenceContentPros) => {
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
            <ConferenceUserCard name="Mostafa" w={220} h={220} />
            <ConferenceUserCard name="Mostafa" w={220} h={220} />
          </Flex>
        </ScrollArea>
      )}
    </Card>
  );
};

export default ConferenceContent;
