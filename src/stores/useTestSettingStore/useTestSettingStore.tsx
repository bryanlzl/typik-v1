import React, { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';
import { top100Words } from '../../static-values/wordAssets';
import { defaultMods, defaultAllowedKeys } from '../../static-values/modsKeysAllowed';

interface TestSetting {
  fontStyle: string;
  mode: string; // either unlimited or wordList
  wordList: string[];
  wordDict: string[];
  duration: number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

interface useTestSettingsProps {
  testSetting: TestSetting;
  setTestSetting: (testSetting: TestSetting) => void;
}

// --- PLACEHOLDER TOP 100 WORDS --- //
const InitWordDict: string[] = top100Words;

const useTestSettingsStore = create<useTestSettingsProps>((set) => ({
  testSetting: {
    fontStyle: 'verdana',
    mode: 'unlimited',
    wordList: ['hello', 'world'], // empty wordList here once wordList RNG has been created on unlimited mode
    wordDict: InitWordDict,
    duration: 30,
    allowedMods: defaultMods,
    allowedKeys: defaultAllowedKeys,
  },

  setTestSetting: (amendedSetting: TestSetting) => {
    set((state) => {
      return { ...state, editProjectSetting: amendedSetting };
    });
  },
}));

export default useTestSettingsStore;
