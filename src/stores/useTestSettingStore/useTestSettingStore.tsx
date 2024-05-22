import React, { Dispatch, SetStateAction } from "react";
import { top99Words } from "../../static-values/wordAssets";
import {
  defaultMods,
  defaultAllowedKeys,
} from "../../static-values/modsKeysAllowed";

import { create } from "zustand";

interface TestSetting {
  fontStyle: string;
  wordList: string[];
  duration: number;
  allowedMods: Set<string>;
  allowedKeys: Set<string>;
}

interface useTestSettingsProps {
  testSetting: TestSetting;
  setTestSetting: (testSetting: TestSetting) => void;
}

const InitwordList: string[] = top99Words;

const useTestSettingsStore = create<useTestSettingsProps>((set) => ({
  testSetting: {
    fontStyle: "verdana",
    wordList: InitwordList,
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
