// Video work: YouTube films and Shorts that play muted on loop, and
// Instagram reels (Instagram embeds can't autoplay, so they play on tap).
//
// `rows` sets how the /videos/ page lays them out: every video in a row is
// sized to the same height, so landscape (16:9) and portrait (9:16) videos
// sit side by side. To add a video, put it in a row; a row of two or three
// reads best. On phones the rows stack: landscape full width, portrait two
// across.

export type YouTubeVideo = {
  id: string;
  /** 16:9 film or 9:16 Short. */
  shape: "landscape" | "portrait";
};

const L = (id: string): YouTubeVideo => ({ id, shape: "landscape" });
const P = (id: string): YouTubeVideo => ({ id, shape: "portrait" });

export const videoRows: YouTubeVideo[][] = [
  [L("8JqbJ_j18Rw")],
  [P("LpOckl2GZgk"), L("UE5BiDEs90Q"), P("5AcZSHBh8ko")],
  [L("AYnTomGhhN0"), L("VkuEsqlx2eI")],
  [L("Wh30hpForIU"), L("DstP5ODXBMQ"), L("81klrncCIxg")],
  [L("QFeoz5-E7Mk"), L("SKL2fnoZlDU")],
  [L("-XFWpEpQzmU"), L("QbTxitaPFdc")],
];

/** The short row on the home page, linking to the full page. */
export const videoTeaser: YouTubeVideo[] = [
  L("8JqbJ_j18Rw"),
  P("LpOckl2GZgk"),
  P("5AcZSHBh8ko"),
];

/** Instagram reel ids (from instagram.com/reel/<id>/). */
export const reels = [
  "C_dOGbRvxgs",
  "C_iL0hAPFfn",
  "C_nUP2WsRUm",
  "C_sdqxovLKN",
  "C_xnc_5Pf5l",
];

export const videoCount =
  videoRows.reduce((n, row) => n + row.length, 0) + reels.length;
