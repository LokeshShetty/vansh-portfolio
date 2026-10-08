// YouTube tiles (`[data-yt]`, components/YouTubeRow.astro). Each starts as a
// thumbnail; when it scrolls into view the player loads and plays muted on
// loop, and it pauses again off screen. Only what's on screen plays. The
// sound button unmutes one tile at a time. Visitors who ask for reduced
// motion get the thumbnail; pressing the sound button starts that video.
//
// Players are controlled with YouTube's postMessage commands
// (enablejsapi=1), so no YouTube API script is loaded.

const tiles = document.querySelectorAll<HTMLElement>("[data-yt]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const command = (tile: HTMLElement, func: string) =>
  tile
    .querySelector("iframe")
    ?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );

function load(tile: HTMLElement, muted: boolean) {
  if (tile.querySelector("iframe")) return;
  const id = tile.dataset.yt!;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    loop: "1",
    playlist: id,
    controls: "0",
    rel: "0",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
    enablejsapi: "1",
  });
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  frame.title = "YouTube video";
  frame.allow = "autoplay; encrypted-media; picture-in-picture";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.tabIndex = -1;
  frame.addEventListener("load", () => {
    // Give the player a moment to start before covering the thumbnail.
    setTimeout(() => (tile.dataset.playing = ""), 600);
  });
  tile.prepend(frame);
}

if (!reduce) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const tile = target as HTMLElement;
        if (isIntersecting) {
          if (tile.querySelector("iframe")) command(tile, "playVideo");
          else load(tile, true);
        } else {
          command(tile, "pauseVideo");
        }
      }
    },
    { threshold: 0.35 },
  );
  for (const tile of tiles) observer.observe(tile);
}

// Sound: one tile at a time.
const setSound = (tile: HTMLElement, on: boolean) => {
  command(tile, on ? "unMute" : "mute");
  tile.querySelector("[data-yt-sound]")?.setAttribute("aria-pressed", `${on}`);
  if (on) tile.dataset.soundOn = "";
  else delete tile.dataset.soundOn;
};

for (const tile of tiles) {
  tile.querySelector("[data-yt-sound]")?.addEventListener("click", () => {
    const on = !("soundOn" in tile.dataset);
    for (const other of tiles) if (other !== tile) setSound(other, false);
    if (!tile.querySelector("iframe")) {
      // Not loaded yet (reduced motion): start it, with sound.
      load(tile, !on);
      if (on) tile.dataset.soundOn = "";
      tile
        .querySelector("[data-yt-sound]")
        ?.setAttribute("aria-pressed", `${on}`);
      return;
    }
    setSound(tile, on);
    if (on) command(tile, "playVideo");
  });
}
