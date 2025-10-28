import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import refreshIcon from '/public/assets/icons/refresh-icon.svg';
import clockIcon from '/public/assets/icons/clock-icon.svg';
import { PropTypes, TimeType, TypingSettings, TimerType } from '@/types/typingTypes';
import { Button, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { timeOptions } from '@/configs/timeOptions';

const Timer = ({ propPackage }: { propPackage: PropTypes }): JSX.Element => {
  const { time, typingState, setTime, setTypingState, setWordsTyped, typingStateRef } = propPackage;
  const [timerSetting, setTimerSetting] = useState<TimerType>({
    duration: 30,
    status: 'waiting',
    isSelectTime: false,
  });
  const timeHandler = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef<TimeType>(time);

  const focusHandler = (): void => {
    setTypingState((prev) => ({ ...prev, focus: !prev.focus }));
  };

  const resetWordHandler = (): void => {
    setTypingState({
      focus: false,
      currentWord: '',
      typedList: [],
      cursorPosition: 0,
      isDone: false,
    });
    setWordsTyped([]);

    if (typingStateRef.current) {
      typingStateRef.current.focus = false;
      typingStateRef.current.currentWord = '';
      typingStateRef.current.typedList = [];
      typingStateRef.current.cursorPosition = 0;
      typingStateRef.current.isDone = false;
    }
  };

  const resetTestHandler = (): void => {
    clearInterval(timeHandler.current!);
    setTimerSetting({
      ...timerSetting,
      status: 'waiting',
      isSelectTime: false,
    });
    setTime({ ...time, status: 'waiting', duration: timerSetting.duration });
    timeRef.current.status = 'waiting';
    timeRef.current.duration = timerSetting.duration;
  };

  const resetAllHandler = (): void => {
    resetTestHandler();
    resetWordHandler();
  };

  const onDurationSelect = (duration: number) => {
    clearInterval(timeHandler.current!);
    setTimerSetting((prev: TimerType) => ({
      ...prev,
      status: 'waiting',
      duration: duration,
      isSelectTime: false,
    }));
    timeRef.current.status = 'waiting';
    timeRef.current.duration = duration;
    setTime((prev: TimeType) => ({ ...prev, status: 'waiting', duration: duration }));
    resetWordHandler();
  };

  const handleDisplayTimeSelector = (): void => {
    setTimerSetting((prev: TimerType) => {
      return { ...prev, isSelectTime: !prev.isSelectTime };
    });
  };

  // ----- Sync current status with timerSetting zustand state ----- //
  useEffect(() => {
    timeRef.current = time;
    setTimerSetting((prev: TimerType) => {
      return { ...prev, status: time.status };
    });
  }, [time]);

  // ----- Monitor current status of timer and test ----- //
  useEffect(() => {
    const tick = (): void => {
      if (
        timeRef.current.status === 'waiting' ||
        timeRef.current.status === 'inactive' ||
        timeRef.current.status === 'completed'
      ) {
        // Do nothing
      } else if (timeRef.current.duration > 1) {
        timeRef.current.duration -= 1;
        setTime({
          status: timeRef.current.status,
          duration: timeRef.current.duration,
        });
        // Schedule the next tick after 1 second
        timeHandler.current = setTimeout(tick, 1000);
      } else {
        resetTestHandler();
        setTimerSetting((prev: TimerType) => ({ ...prev, status: 'completed' }));
        setTime({
          duration: timerSetting.duration,
          status: 'completed',
        });
        timeRef.current.status = 'completed';
        timeRef.current.duration = timerSetting.duration;
        setTypingState((prev: TypingSettings) => ({ ...prev, isDone: true }));
        clearTimeout(timeHandler.current!);
      }
    };
    timeHandler.current = setTimeout(tick, 1000);
    return () => {
      clearTimeout(timeHandler.current!);
    };
  }, [timeRef.current.status]);

  return (
    <div className="flex flex-row mx-[1.7vw] cursor-default">
      {!typingState.isDone && (
        <h2 className="text-[1.5vw] mr-[4vw] opacity-60">{time.duration < 10 ? '0' + time.duration : time.duration}</h2>
      )}
      <Popover className="flex flex-row">
        <PopoverButton
          className="flex text-[1.5vw] mr-[4vw] items-center opacity-60 focus:outline-none"
          // hover:opacity-100
          // onClick={handleDisplayTimeSelector}
        >
          <Image className="w-[1.7vw]" src={clockIcon} alt="clock-icon" />
          {timerSetting.duration !== 0 && (
            <p className="text-[0.7vw] font-medium pb-[0.2vw] self-end">
              {(timerSetting.duration < 10 ? '0' + timerSetting.duration : timerSetting.duration) + 's'}
            </p>
          )}
        </PopoverButton>
        <Transition show={timerSetting.isSelectTime}>
          <PopoverPanel
            className="absolute z-10 w-[6vw] bg-white divide-y divide-slate-200 rounded-lg shadow-lg shadow-slate-300/50 opacity-[85%]"
            onMouseLeave={handleDisplayTimeSelector}
          >
            <ul className="py-2 text-sm text-black">
              {timeOptions.map((duration, index) => (
                <li key={index}>
                  <span
                    className="block px-[0.5vw] py-[0.4vw] transition hover:bg-slate-200 text-center cursor-pointer text-[0.8vw]"
                    onClick={() => {
                      // resetAllHandler();
                      onDurationSelect(duration);
                    }}
                  >
                    {duration} s
                  </span>
                </li>
              ))}
            </ul>
          </PopoverPanel>
        </Transition>
      </Popover>
      <div className="flex flex-row">
        <Button onClick={resetAllHandler}>
          <Image className="w-[1.7vw] opacity-60 hover:opacity-100 mr-[4vw]" src={refreshIcon} alt="refresh-icon" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;

// console.log(
//   timeRef.current.status,
//   time.status,
//   timerSetting.status,
//   timeRef.current.duration
// );
