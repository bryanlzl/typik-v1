import { defaultAllowedKeys, defaultMods } from '@/configs/allowedKeys';
import { top100Words } from '@/configs/words';
import { create } from 'zustand';

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
    wordList: InitWordDict, // empty wordList here once wordList RNG has been created on unlimited mode
    wordDict: InitWordDict,
    duration: 30,
    allowedMods: defaultMods,
    allowedKeys: defaultAllowedKeys,
  },

  setTestSetting: (amendedSetting: TestSetting) => {
    set((state: useTestSettingsProps) => {
      return { ...state, editProjectSetting: amendedSetting };
    });
  },
}));

export default useTestSettingsStore;
