import { Center, Pagination } from '@mantine/core';

const PaginationMeta = ({
  meta,
  page,
  setPage,
}: {
  meta?: IPaginationMeta;
  page: number;
  setPage: (page: number) => void;
}) => {
  return (
    <Center h={80}>
      <Pagination
        total={meta?.total_pages || 0}
        value={page}
        onChange={setPage}
      />
    </Center>
  );
};

export default PaginationMeta;
