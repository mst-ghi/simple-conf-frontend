import { Image, ImageProps } from '@mantine/core';

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  height?: number;
  width?: number;
};

const Logo = (props: LogoProps) => {
  return <Image src="/logo-dark.png" alt="logo" {...props} />;
};

export default Logo;
