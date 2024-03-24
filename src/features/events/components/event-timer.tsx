import { addToDate, dateView } from '@/utils';
import { Card, Center, Flex, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';

const EventTimer = ({
  startDate,
  duration,
  miw = 220,
  h = 110,
  bg,
}: {
  startDate: Date;
  duration: number;
  miw?: number;
  h?: number;
  bg?: string;
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
    <Flex direction="column" align="center" gap={4} mt={4}>
      <Card shadow="0" px="sm" pt={12} miw={miw} h={h}>
        <Card.Section bg={bg} pt="xs" pb={2}>
          <Center>
            <Text fw={500} tt="capitalize" fz={14}>
              {dateView(startDate, 'full-date-time')}
            </Text>
          </Center>
        </Card.Section>

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
    </Flex>
  );
};

export default EventTimer;
