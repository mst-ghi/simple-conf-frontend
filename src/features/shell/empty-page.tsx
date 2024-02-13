import { Flex, FlexProps } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Envs } from '@/utils';

const EmptyPage = ({
  children,
  ...props
}: { children?: React.ReactNode } & FlexProps) => {
  useDocumentTitle(Envs.app.title);

  return (
    <Flex mih="64vh" direction="column" {...props}>
      {children}
    </Flex>
  );
};

export default EmptyPage;
