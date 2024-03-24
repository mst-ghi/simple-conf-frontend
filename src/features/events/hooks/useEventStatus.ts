import { addTimeTo, isDateAfter, isDateBefore } from '@/utils';
import { useMemo } from 'react';

const useEventStatus = ({ event }: { event?: IEvent } = {}) => {
  const isPended = useMemo(() => {
    if (!event) {
      return undefined;
    }

    return isDateAfter(event.start_at) && event.status !== 'finished';
  }, [event]);

  const isStarted = useMemo(() => {
    if (!event) {
      return undefined;
    }

    const endedAt = addTimeTo(event.start_at, event.duration, 'minute');

    return (
      isDateBefore(event.start_at) &&
      isDateAfter(endedAt) &&
      event.status !== 'finished'
    );
  }, [event]);

  const isFinished = useMemo(() => {
    if (!event) {
      return undefined;
    }

    const endedAt = addTimeTo(event.start_at, event.duration, 'minute');

    return isDateBefore(endedAt) && event.status === 'finished';
  }, [event]);

  return {
    isPended,
    isStarted,
    isFinished,
  };
};

export default useEventStatus;
