import { CallModal, useCallBootstrap } from '..';

const CallCenter = () => {
  const { callInfo } = useCallBootstrap();

  return <CallModal receiving={Boolean(callInfo?.roomId)} onClose={() => {}} />;
};

export default CallCenter;
