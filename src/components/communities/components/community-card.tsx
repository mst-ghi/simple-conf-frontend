import { CommunityMenu } from '.';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Avatar, Card, Divider, Flex, Group, Text, Title } from '@mantine/core';

const CommunityCard = ({ community }: { community?: ICommunity }) => {
  const isActive = community?.status === 'active';

  if (!community) {
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
              {community.status}
            </Text>
          </Flex>

          <CommunityMenu community={community} />
        </Flex>
      </Card.Section>

      <Text c="gray" tt="capitalize" size="sm" mb={6}>
        {community.owner?.name}
      </Text>

      <Flex direction="column">
        <Title order={3} tt="capitalize">
          {community.title}
        </Title>

        <Text>{community.description}</Text>
      </Flex>

      <Divider
        mt="sm"
        labelPosition="left"
        label={<Text size="sm">Joined Users</Text>}
      />

      <Flex direction="row" align="center" wrap="wrap" mt="sm" gap="sm">
        {community.users?.map((user) => {
          return (
            <Card key={`${community.id}-${user.id}`} p={6} radius="md">
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

        {!community.users ||
          (!community.users[0] && (
            <Text c="gray" tt="capitalize" size="sm">
              No users have joined the community
            </Text>
          ))}
      </Flex>
    </Card>
  );
};

export default CommunityCard;
