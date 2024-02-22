import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import refreshIcon from "../../public/assets/icons/refresh-icon.svg";
import clockIcon from "../../public/assets/icons/clock-icon.svg";
import {
  PropTypes,
  TimeType,
  TypingSettings,
  Timer,
} from "../types/TypingTypes";

const Timer = ({ propPackage }: { propPackage: PropTypes }) => {
  const {
    time,
    typingState,
    setTime,
    setTypingState,
    setWordsTyped,
    typingStateRef,
  } = propPackage;
  const [timerSetting, setTimerSetting] = useState<Timer>({
    duration: 15,
    status: "waiting",
    isSelectTime: false,
  });
  const timeHandler = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef<TimeType>(time);

  const timeOptions: number[] = [5, 15, 30, 60, 90];

  useEffect(() => {
    timeRef.current = time;
    setTimerSetting((prev: Timer) => {
      return { ...prev, status: time.status };
    });
  }, [time]);

  useEffect(() => {
    const tick = () => {
      if (
        timeRef.current.status === "waiting" ||
        timeRef.current.status === "inactive" ||
        timeRef.current.status === "completed"
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
        setTimerSetting((prev) => ({ ...prev, status: "completed" }));
        setTime({
          duration: timerSetting.duration,
          status: "completed",
        });
        timeRef.current.status = "completed";
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

  // console.log(
  //   timeRef.current.status,
  //   time.status,
  //   timerSetting.status,
  //   timeRef.current.duration
  // );

  const resetWordHandler = (): void => {
    setTypingState({
      focus: false,
      currentWord: "",
      typedList: [],
      cursorPosition: 0,
      isDone: false,
    });
    setWordsTyped([]);

    if (typingStateRef.current) {
      typingStateRef.current.focus = false;
      typingStateRef.current.currentWord = "";
      typingStateRef.current.typedList = [];
      typingStateRef.current.cursorPosition = 0;
      typingStateRef.current.isDone = false;
    }
  };

  const resetTestHandler = (): void => {
    clearInterval(timeHandler.current!);
    setTimerSetting({
      ...timerSetting,
      status: "waiting",
      isSelectTime: false,
    });
    setTime({ ...time, status: "waiting", duration: timerSetting.duration });
    timeRef.current.status = "waiting";
    timeRef.current.duration = timerSetting.duration;
  };

  const resetAllHandler = (): void => {
    resetTestHandler();
    resetWordHandler();
  };

  const onDurationSelect = (duration: number) => {
    clearInterval(timeHandler.current!);
    setTimerSetting((prev: Timer) => ({
      ...prev,
      duration: duration,
      isSelectTime: false,
    }));
    timeRef.current.status = time.status;
    timeRef.current.duration = duration;
    setTime((prev: TimeType) => ({ ...prev, duration: duration }));
    resetWordHandler();
  };

  const renderTimerFunction = (): JSX.Element => {
    return (
      <div className="flex flex-row">
        <button
          className="flex text-[1.5vw] items-center opacity-60 hover:opacity-100 mr-[4vw]"
          onClick={() => {
            setTimerSetting((prev: Timer) => {
              return { ...prev, isSelectTime: !prev.isSelectTime };
            });
          }}
        >
          <Image className="w-[1.7vw]" src={clockIcon} alt="clock-icon" />
          {timerSetting.duration != 0 && (
            <p className="text-[0.7vw] font-medium pb-[0.2vw] self-end">
              {timerSetting.duration + "s"}
            </p>
          )}
        </button>

        <div
          className={`${
            !timerSetting.isSelectTime && "hidden"
          } absolute z-10 w-[6vw] bg-white divide-y divide-slate-200 rounded-lg shadow-lg shadow-slate-300/50 opacity-[85%]`}
          onMouseLeave={() => {
            setTimerSetting((prev: Timer) => {
              return { ...prev, isSelectTime: false };
            });
          }}
        >
          <ul className="py-2 text-sm text-black">
            {timeOptions.map((duration: number, index: number) => (
              <li key={index}>
                <span
                  className="block px-[0.5vw] py-[0.4vw] hover:bg-slate-200 text-center cursor-pointer text-[0.8vw]"
                  onClick={() => {
                    onDurationSelect(duration);
                  }}
                >
                  {duration} s
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row mx-[1.7vw]">
      {!typingState.isDone && (
        <h2 className="text-[1.5vw] mr-[4vw] opacity-60">{time.duration}</h2>
      )}
      {renderTimerFunction()}
      <div className="flex flex-row">
        <button onClick={resetAllHandler}>
          <Image
            className="w-[1.7vw] opacity-60 hover:opacity-100 mr-[4vw]"
            src={refreshIcon}
            alt="refresh-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Timer;
