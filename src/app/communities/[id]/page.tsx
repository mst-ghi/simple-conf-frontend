'use client';

import { Page } from '@/features/shell';
import { notFound } from 'next/navigation';
import {
  CommunityEvents,
  CommunityMenu,
  useFetchCommunity,
} from '@/features/communities';
import {
  Avatar,
  Card,
  Center,
  Divider,
  Flex,
  Group,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { Fragment } from 'react';
import {
  IconCalendarCheck,
  IconMessage2,
  IconUsersGroup,
} from '@tabler/icons-react';
import { CommentsGroup } from '@/features/comments';

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

      <Card withBorder={false} px={0} pt={0}>
        <Text c="gray" tt="capitalize" size="sm" mb={4}>
          {data?.community.owner?.name}
        </Text>

        <Flex direction="column">
          <Title order={2} tt="capitalize">
            {data?.community.title}
          </Title>

          <Text mt="xs">{data?.community.description}</Text>
        </Flex>
      </Card>

      <Tabs mt="lg" defaultValue="events" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="events" leftSection={<IconCalendarCheck />}>
            Events
          </Tabs.Tab>

          <Tabs.Tab value="users" leftSection={<IconUsersGroup />}>
            Users
          </Tabs.Tab>

          <Tabs.Tab value="comments" leftSection={<IconMessage2 />}>
            Comments
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="events" p="sm">
          <CommunityEvents communityId={data?.community.id} />
        </Tabs.Panel>

        {data?.community.id && (
          <Tabs.Panel value="comments" p="sm">
            <CommentsGroup modelId={data?.community.id} modelType="community" />
          </Tabs.Panel>
        )}

        <Tabs.Panel value="users" p="sm">
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

            {!Boolean(data && data.community?.users?.length) && (
              <Text c="gray" tt="capitalize" size="sm">
                No Users
              </Text>
            )}
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </Page>
  );
}
