"use strict";
const emojis = {
  "-": " ",
  O: "🏠",
  X: "🌳",
  I: "🦴",
  PLAYER: "🐶",
  BOMB_COLLISION: "💥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤️",
};
const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
maps.push(`
  O---XXXXXX
  XXX-XXXXXX
  XXX-XXXXIX
  XXX-XXXX-X
  XXX---XX-X
  XX--X-XX-X
  XX--X-XX-X
  XX--XXXX-X
  XX-------X
  XXXXXXXXXX
`);
maps.push(`
  X--------X
  XXX-XX-X-X
  XXX-XX-XOX
  XXX-XX-X-X
  XXX--X-X-X
  I---X--X-X
  XX--X-XX-X
  XX--X-XX-X
  XX-------X
  XXXXXXXXXX
`);
maps.push(`
  X---XXXXXX
  X-X-XXXX-X
  --X-XXXXXX
  -XX-XX-X-X
  -XX----X-X
  O--XX--X-X
  XX-XX-XX-X
  XX-XX-XX-X
  XX-XX----X
  XXXXXXXXIX
`);
maps.push(`
  XXXXXXXXXX
  XXX------X
  XXX-XXX-XX
  ----XXX-XX
  -XXX--X-XX
  -X----X-XX
  -X-XX-X-XX
  -X-XX-X-XX
  -X-XX----X
  IXXXXXXXOX
`);
maps.push(`
  XXXXXXXXXX
  ---------X
  -XXXXXXX-X
  -X---XXX-X
  -X-X-XXX-X
  -X-X-IXX-X
  -X-XXXXX-X
  -X-XXXXX-X
  -X-------X
  OXXXXXXXXX
`);
