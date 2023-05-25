import * as os from "os";

/**
 * Generate new line before and after the text
 * Use proper line separator for the current OS
 */
export const lineSeparator = (text: string) => {
  return `${os.EOL}${text}${os.EOL}`;
};

/**
 * Generate only line before the text
 */
export const lineBefore = (text: string) => {
  return `${os.EOL}${text}`;
};

/**
 * Generate only line after the text
 */
export const lineAfter = (text: string) => {
  return `${text}${os.EOL}`;
};

export const newLine = os.EOL;
