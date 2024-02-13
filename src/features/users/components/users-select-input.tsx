import { Loader, Select, SelectProps } from '@mantine/core';
import { useFetchUsers } from '..';
import { IconUsers } from '@tabler/icons-react';
import { useApp } from '@/hooks';

interface UsersSelectProps
  extends Omit<
    SelectProps,
    'searchable' | 'clearable' | 'leftSection' | 'data' | 'onChange'
  > {
  onSelectUser: (user: IUser) => void;
}
const UsersSelectInput = ({ onSelectUser, ...props }: UsersSelectProps) => {
  const { user } = useApp();
  const { data, isFetching } = useFetchUsers();

  if (!user?.id) {
    return null;
  }

  return (
    <Select
      searchable
      clearable
      withAsterisk
      leftSection={isFetching ? <Loader /> : <IconUsers />}
      placeholder="Select one of users"
      data={data?.users.map((el) => ({ value: el.id, label: el.email })) || []}
      onChange={(userId) => {
        if (userId) {
          const selectedUser = data?.users.find((el) => el.id === userId);
          if (selectedUser) {
            onSelectUser(selectedUser);
          }
        }
      }}
      {...props}
    />
  );
};

export default UsersSelectInput;
