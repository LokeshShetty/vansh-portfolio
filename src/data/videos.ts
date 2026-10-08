// Video work: YouTube films (16:9) and Shorts (9:16). They play muted on
// loop as they scroll into view.
//
// `videoRows` sets how the /videos/ page lays them out: every video in a
// row is sized to the same height, so films and Shorts sit side by side.
// To add a video, put it in a row. On phones the rows stack: films full
// width, Shorts two across.

export type YouTubeVideo = {
  id: string;
  /** 16:9 film or 9:16 Short. */
  shape: "landscape" | "portrait";
};

const L = (id: string): YouTubeVideo => ({ id, shape: "landscape" });
const P = (id: string): YouTubeVideo => ({ id, shape: "portrait" });

export const videoRows: YouTubeVideo[][] = [
  [L("8JqbJ_j18Rw")],
  [P("LpOckl2GZgk"), L("QbTxitaPFdc"), P("5AcZSHBh8ko")],
  [L("AYnTomGhhN0"), L("VkuEsqlx2eI")],
  [
    P("4KNW5AxgWWU"),
    P("7gkNyU_YsK8"),
    P("SMPW1ersKFY"),
    P("GmicGBolS7k"),
    P("RJz2h-bvS1g"),
  ],
  [L("Wh30hpForIU"), L("DstP5ODXBMQ"), L("81klrncCIxg")],
  [L("QFeoz5-E7Mk"), L("UE5BiDEs90Q")],
  [L("-XFWpEpQzmU"), L("SKL2fnoZlDU")],
];

/** The short row on the home page, linking to the full page. */
export const videoTeaser: YouTubeVideo[] = [
  L("8JqbJ_j18Rw"),
  P("LpOckl2GZgk"),
  P("5AcZSHBh8ko"),
];

export const videoCount = videoRows.reduce((n, row) => n + row.length, 0);
