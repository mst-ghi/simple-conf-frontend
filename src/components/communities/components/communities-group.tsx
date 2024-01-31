import { Card, Center, Flex, Text } from '@mantine/core';
import { CommunityCard } from '.';

const CommunitiesGroup = ({ communities }: { communities?: ICommunity[] }) => {
  if (!communities) {
    return (
      <Card>
        <Center w="100%" h={136}>
          <Text size="lg" c="dimmed">
            There are no active communities
          </Text>
        </Center>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap="lg">
      {communities.map((community) => {
        return (
          <CommunityCard
            key={`community-${community.id}`}
            community={community}
          />
        );
      })}
    </Flex>
  );
};

export default CommunitiesGroup;
