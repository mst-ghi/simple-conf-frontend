import {
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useThemeStyle = () => {
  const theme = useMantineTheme();

  const { setColorScheme } = useMantineColorScheme();
  const colorSchema = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, true, {
    getInitialValueInEffect: false,
  });

  return {
    theme,
    colorSchema,

    setColorScheme,

    isMobile,
    isDesktop: !isMobile,
    isDarkTheme: colorSchema === 'dark',
    isLightTheme: colorSchema === 'light',
  };
};

export default useThemeStyle;
