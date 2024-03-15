'use client';

import { Page } from '@/features/shell';
import { notFound } from 'next/navigation';
import {
  CommunityEvents,
  CommunityMenu,
  useFetchCommunity,
} from '@/features/communities';
import { Avatar, Card, Divider, Flex, Group, Text, Title } from '@mantine/core';
import { Fragment } from 'react';

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { data, isFetching, refetch } = useFetchCommunity(params.id);

  if (!isFetching && !data?.community?.id) {
    notFound();
  }

  return (
    <Page
      title={isFetching ? 'Loading...' : data?.community?.title}
      loading={isFetching}
    >
      <Flex direction="row" justify="end" mb="md">
        <CommunityMenu community={data?.community} done={refetch} />
      </Flex>

      <Card>
        <Text c="gray" tt="capitalize" size="sm" mb={6}>
          {data?.community.owner?.name}
        </Text>

        <Flex direction="column">
          <Title order={3} tt="capitalize">
            {data?.community.title}
          </Title>

          <Text>{data?.community.description}</Text>
        </Flex>
      </Card>

      {Boolean(data && data.community?.users?.length) && (
        <Fragment>
          <Divider
            mt="sm"
            labelPosition="left"
            label={<Text size="sm">Joined Users</Text>}
          />

          <Flex direction="row" align="center" wrap="wrap" mt="sm" gap="sm">
            {data?.community.users?.map((user) => {
              return (
                <Card
                  key={`${data?.community.id}-${user.id}`}
                  p={6}
                  radius="md"
                >
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
          </Flex>
        </Fragment>
      )}

      <Divider
        my="md"
        labelPosition="left"
        label={<Text size="sm">All Active Events</Text>}
      />

      <CommunityEvents communityId={data?.community.id} />
    </Page>
  );
}
