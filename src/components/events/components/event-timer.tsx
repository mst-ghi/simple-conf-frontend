import { addToDate } from '@/utils';
import { Card, Center, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';

const EventTimer = ({
  startDate,
  duration,
}: {
  startDate: Date;
  duration: number;
}) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const target = startDate.getTime();
    let remainingValue = target - now;

    if (remainingValue <= 0) {
      remainingValue = addToDate(startDate, duration, 'minute').getTime() - now;
    }

    const days = Math.floor(remainingValue / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (remainingValue % (1000 * 60 * 60)) / (1000 * 60),
    );

    return {
      days: days < 0 ? 0 : days,
      hours: hours < 0 ? 0 : hours,
      minutes: minutes < 0 ? 0 : minutes,
    };
  };

  const [remaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (startDate) {
      setTimeRemaining(calculateTimeRemaining());
    }
  }, [startDate]);

  return (
    <Card shadow="0" px="sm" pt="xs" miw={192} mih={117}>
      <Center>
        <Text fw={500} size="sm" c="gray">
          Remaining
        </Text>
      </Center>

      <Center
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <Text
          fw={500}
          fz={40}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {remaining.days}
          <span style={{ fontSize: 12, marginTop: -12, color: 'gray' }}>
            days
          </span>
        </Text>

        <Text
          fw={500}
          fz={40}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {remaining.hours}
          <span style={{ fontSize: 12, marginTop: -12, color: 'gray' }}>
            hours
          </span>
        </Text>

        <Text
          fw={500}
          fz={40}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {remaining.minutes}
          <span style={{ fontSize: 12, marginTop: -12, color: 'gray' }}>
            minutes
          </span>
        </Text>
      </Center>
    </Card>
  );
};

export default EventTimer;
