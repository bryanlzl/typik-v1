// --- DEFAULT SETTINGS --- //
export const defaultMods: Set<string> = new Set([
  "Backspace",
  " ",
  "CapsLock",
  "Control",
  "Shift",
  "Escape",
]);

// Addition of all other characters
export const defaultAllowedKeys: Set<string> = new Set([
  "Backspace",
  " ",
  "CapsLock",
  "Control",
  "Shift",
  "Escape",
]);

// Allow common punctuation marks
export const defaultPunctuationMarks: string[] = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
];

// --- CUSTOM SETTINGS --- ///

// --- Handler to include alphas and/or numeric --- //
export const handleIncludeAlphaNums = (
  allowedKeys: Set<string>,
  lower: boolean,
  upper: boolean,
  num: boolean
) => {
  if (lower) {
    for (let i = 97; i <= 122; i++) {
      allowedKeys.add(String.fromCharCode(i)); // Add lowercase letters
    }
  }
  if (upper) {
    for (let i = 65; i <= 90; i++) {
      allowedKeys.add(String.fromCharCode(i)); // Add uppercase letters
    }
  }
  if (num) {
    for (let i = 48; i <= 57; i++) {
      allowedKeys.add(String.fromCharCode(i)); // Add numeric characters
    }
  }

  return allowedKeys;
};
