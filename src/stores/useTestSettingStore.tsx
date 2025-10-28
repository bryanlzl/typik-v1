import { DEFAULT_ALLOWED_KEYS, DEFAULT_MODS } from '@/configs/allowedKeys';
import { WORDS_TOP_100 } from '@/configs/words';
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
const InitWordDict: string[] = WORDS_TOP_100;

const useTestSettingsStore = create<useTestSettingsProps>((set) => ({
  testSetting: {
    fontStyle: 'verdana',
    mode: 'unlimited',
    wordList: InitWordDict, // empty wordList here once wordList RNG has been created on unlimited mode
    wordDict: InitWordDict,
    duration: 30,
    allowedMods: DEFAULT_MODS,
    allowedKeys: DEFAULT_ALLOWED_KEYS,
  },

  setTestSetting: (amendedSetting: TestSetting) => {
    set((state: useTestSettingsProps) => {
      return { ...state, editProjectSetting: amendedSetting };
    });
  },
}));

export default useTestSettingsStore;
