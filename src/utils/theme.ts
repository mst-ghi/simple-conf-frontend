import { MantineThemeOverride, ScrollArea } from '@mantine/core';

export const BaseTheme: Partial<MantineThemeOverride> = {
  defaultRadius: 'md',
  primaryColor: 'dark',
  components: {
    Loader: {
      defaultProps: {
        type: 'oval',
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: 'light',
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
        style: {
          opacity: 0.9,
        },
      },
    },
  },
};
