import ADLER32 from 'adler-32'

/**
 * Calculate the Adler32 hash of a string
 *
 * @param {String} input The string to hash
 * @returns {String} a 8-character ASCII string representing the hash
 */
export const toAdler32Str = (input: string): string => {
  const adlerHash = ADLER32.str(input)
  let adlerStr = (adlerHash >>> 0).toString(16)
  const adlerLength = 8 - adlerStr.length
  for (let i = 0; i < adlerLength; i++) adlerStr = '0' + adlerStr
  return adlerStr
}
