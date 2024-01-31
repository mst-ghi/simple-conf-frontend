import { CommunityMenu } from '.';
import { closeAllModals } from '@mantine/modals';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Avatar, Card, Divider, Flex, Group, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFetchCommunity } from '..';

const CommunityCard = ({ community }: { community?: ICommunity }) => {
  const [communityData, setCommunityData] = useState<ICommunity>();

  const { data, refetch } = useFetchCommunity(communityData?.id, {
    enabled: false,
  });

  const isActive = communityData?.status === 'active';

  const onFormDoneAction = () => {
    closeAllModals();
    refetch();
  };

  useEffect(() => {
    if (community) {
      setCommunityData(community);
    }
  }, [community]);

  useEffect(() => {
    if (data?.community) {
      setCommunityData(data.community);
    }
  }, [data]);

  if (!community || !communityData) {
    return null;
  }

  return (
    <Card shadow="md">
      <Card.Section h={36} bg="dark" mb="sm">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          h="100%"
          px="md"
        >
          <Flex direction="row" align="center" gap={2}>
            {isActive ? (
              <IconCheck size={22} color="white" />
            ) : (
              <IconX size={22} color="orange" />
            )}

            <Text c={isActive ? 'white' : 'orange'} tt="capitalize">
              {communityData.status}
            </Text>
          </Flex>

          <CommunityMenu community={communityData} done={onFormDoneAction} />
        </Flex>
      </Card.Section>

      <Text c="gray" tt="capitalize" size="sm" mb={6}>
        {communityData.owner?.name}
      </Text>

      <Flex direction="column">
        <Title order={3} tt="capitalize">
          {communityData.title}
        </Title>

        <Text>{communityData.description}</Text>
      </Flex>

      <Divider
        mt="sm"
        labelPosition="left"
        label={<Text size="sm">Joined Users</Text>}
      />

      <Flex direction="row" align="center" wrap="wrap" mt="sm" gap="sm">
        {communityData.users?.map((user) => {
          return (
            <Card key={`${communityData.id}-${user.id}`} p={6} radius="md">
              <Card.Section h={16} bg="gray.2" mb={4} />
              <Group gap={6}>
                <Avatar size={36} src="/user.png" radius={40} />
                <div>
                  <Text fz="sm" fw={400}>
                    {user.name}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {user.email}
                  </Text>
                </div>
              </Group>
            </Card>
          );
        })}

        {!communityData.users ||
          (!communityData.users[0] && (
            <Text c="gray" tt="capitalize" size="sm">
              No users have joined the community
            </Text>
          ))}
      </Flex>
    </Card>
  );
};

export default CommunityCard;
