export interface Config {
  /**
   * The number of characters used to build a new game token.
   */
  TOKEN_LENGTH: number,

  /**
   * The character set used to generate tokens. Keys in this map are the actual characters to use, whereas the
   * value is a string containing all characters that if input will be replaced by the key character. In this way, the
   * mapping supports correcting mistyped inputs. If no substitutions should be made for a given character, it should
   * map to the empty string.
   * 
   * <p>E.g., the mapping { "g": "bcdeptvwz3" } indicates that a game token can contain the characer 'g', and any
   * occurence of the characters "b", "c", "d", ... should be replacec by "g" before using it to reference an existing
   * game.
   * 
   * <p>The maximum number of unique keys <em>MAX_KEYS</em> that can be generated is described by the function 
   * Math.pow(Object.keys(TOKEN_CHARS).length, TOKEN_LENGTH). The probability of a collision within a set of <em>X</em>
   * random keys, then, is described by the function 1 - Math.pow(Math.E, -(X * (X - 1)) / (2 * MAX_KEYS)).
   */
  TOKEN_CHARS: { [char: string]: string },

  /**
   * A function used to reformat tokens to make them suitable for display to humans.
   * 
   * @param token the normalized token string to format.
   */
  TOKEN_FORMATTER(token: string): string,

  /**
   * A function used to normalize input tokens before using them as lookup keys.
   * 
   * @param token the input string to normalize.
   */
  TOKEN_NORMALIZER(token: string): string,

  /**
   * The number of tokens the new game algorithm will check for availability in a single batch.
   */
  GAME_TOKEN_BATCH_SIZE: number,

  /**
   * The maximum number of attempts the game creation algorithm will run before giving up.
   */
  MAX_NEW_GAME_TRIES: number,

  /**
   * The maximum amount of time a game can be allocated; after this timeout it's considered expired and new games can
   * overwrite it.
   */
  GAME_TIMEOUT_MS: number,
};

const TOKEN_CHARS: { [char: string]: string } = Object.freeze({
  'a': 'kj',
  'g': 'bcdeptvwz3',
  'f': '',
  'h': '',
  'y': 'i',
  'q': 'u2',
  'r': '',
  'x': 's',
  'w': '',
  '1': 'l',
  '4': '',
  '5': '',
  '6': '',
  '7': '',
  '8': '',
  '9': '',
});

const SUBSTITUTION_MAP = Object.freeze(
  Object
      .keys(TOKEN_CHARS)
      .reduce((map: { [char: string]: string }, char: string) => {
        const substitutions = TOKEN_CHARS[char];
        for (let i = 0; i < substitutions.length; i++) {
          map[substitutions.charAt(i)] = char;
        }
        return map;
      }, {}));

const CONFIG: Config = Object.freeze({
  TOKEN_LENGTH: 9,
  TOKEN_CHARS,
  TOKEN_FORMATTER(token: string): string {
    return `${token.substring(0, 3)}-${token.substring(3, 6)}-${token.substring(6, 9)}`;
  },
  TOKEN_NORMALIZER(token: string): string {
    let normalized = "";
    for (let i = 0; i < token.length; i++) {
      let c = token.charAt(i).toLowerCase();
      if (c in SUBSTITUTION_MAP) {
        c = SUBSTITUTION_MAP[c];
      } else if (!(c in TOKEN_CHARS)) {
        c = '';
      }
      normalized += c;
    }
    return normalized;
  },
  GAME_TOKEN_BATCH_SIZE: 20,
  MAX_NEW_GAME_TRIES: 3,
  GAME_TIMEOUT_MS: 3 * 3600 * 1000, // 3 hours
});

export default CONFIG;
