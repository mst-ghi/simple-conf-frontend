import { Loader, Select } from '@mantine/core';
import { IconCube } from '@tabler/icons-react';
import { useFetchCommunities } from '..';

const CommunitySelect = ({
  communityId,
  onSelect,
}: {
  communityId?: string;
  onSelect?: (community?: ICommunity | null) => void;
}) => {
  const { data, isFetching } = useFetchCommunities({ own: true });

  return (
    <Select
      searchable
      clearable
      value={communityId}
      label="Community"
      leftSection={isFetching ? <Loader /> : <IconCube size={14} />}
      placeholder="Search your community and select them..."
      data={data?.communities.map((community) => ({
        value: community.id,
        label: `# ${community.title}`,
      }))}
      onChange={(id) => {
        if (onSelect) {
          onSelect(data?.communities.find((el) => el.id === id));
        }
      }}
    />
  );
};

export default CommunitySelect;
