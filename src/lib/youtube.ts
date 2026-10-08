// YouTube tiles (`[data-yt]`, components/YouTubeRow.astro). Each starts as a
// thumbnail; when it scrolls into view a player loads, is muted and starts
// playing, loops at the end, and pauses again off screen, so only what's on
// screen plays. The sound button unmutes one tile at a time.
//
// Uses YouTube's IFrame Player API (loaded once, when the first tile comes
// into view), which reports when each player is ready and whether it is
// actually playing. If a browser still blocks autoplay, or the visitor asks
// for reduced motion, the tile shows a play button instead.

type Player = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getPlayerState(): number;
  getIframe(): HTMLIFrameElement;
};
type PlayerEvent = { target: Player; data: number };
type YT = {
  Player: new (
    el: HTMLElement,
    options: {
      host: string;
      videoId: string;
      width: string;
      height: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (e: PlayerEvent) => void;
        onStateChange: (e: PlayerEvent) => void;
      };
    },
  ) => Player;
};
declare global {
  interface Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYING = 1;
const BUFFERING = 3;
const ENDED = 0;

let api: Promise<YT> | undefined;
const loadApi = () =>
  (api ??= new Promise<YT>((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.append(script);
  }));

const tiles = [...document.querySelectorAll<HTMLElement>("[data-yt]")];
const players = new Map<HTMLElement, Player>();
const inView = new Set<HTMLElement>();
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const isPlaying = (p: Player) =>
  [PLAYING, BUFFERING].includes(p.getPlayerState());

// If a tile that should be playing isn't a few seconds later, autoplay was
// blocked: show the play button.
function check(tile: HTMLElement) {
  setTimeout(() => {
    const p = players.get(tile);
    if (p && inView.has(tile) && !isPlaying(p)) tile.dataset.blocked = "";
  }, 3500);
}

async function create(tile: HTMLElement, play: boolean) {
  if ("loading" in tile.dataset) return;
  tile.dataset.loading = "";
  const YT = await loadApi();
  const id = tile.dataset.yt!;
  const start = Number(tile.dataset.start ?? 0);
  const mount = document.createElement("div");
  tile.prepend(mount);
  new YT.Player(mount, {
    host: "https://www.youtube-nocookie.com",
    videoId: id,
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: play ? 1 : 0,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      start,
      origin: location.origin,
    },
    events: {
      onReady: ({ target }) => {
        players.set(tile, target);
        const frame = target.getIframe();
        frame.tabIndex = -1;
        frame.title = "YouTube video";
        target.mute();
        if (play && inView.has(tile)) {
          target.playVideo();
          check(tile);
        }
      },
      onStateChange: ({ target, data }) => {
        if (data === PLAYING) {
          tile.dataset.playing = "";
          delete tile.dataset.blocked;
        } else if (data === ENDED) {
          // Loop.
          target.seekTo(start, true);
          target.playVideo();
        }
      },
    },
  });
}

function play(tile: HTMLElement) {
  const p = players.get(tile);
  if (!p) return create(tile, true);
  p.playVideo();
  check(tile);
}

if (reduce) {
  for (const tile of tiles) tile.dataset.blocked = "";
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const tile = target as HTMLElement;
        if (isIntersecting) {
          inView.add(tile);
          play(tile);
        } else {
          inView.delete(tile);
          players.get(tile)?.pauseVideo();
        }
      }
    },
    { threshold: 0.3 },
  );
  for (const tile of tiles) observer.observe(tile);
}

// The play button (autoplay blocked, or reduced motion): a click is a user
// gesture, so the browser lets it play.
for (const tile of tiles) {
  tile.querySelector("[data-yt-play]")?.addEventListener("click", () => {
    inView.add(tile);
    delete tile.dataset.blocked;
    play(tile);
  });
}

// Sound: one tile at a time.
const setSound = (tile: HTMLElement, on: boolean) => {
  const p = players.get(tile);
  if (p) {
    if (on) p.unMute();
    else p.mute();
  }
  tile.querySelector("[data-yt-sound]")?.setAttribute("aria-pressed", `${on}`);
  if (on) tile.dataset.soundOn = "";
  else delete tile.dataset.soundOn;
};

for (const tile of tiles) {
  tile.querySelector("[data-yt-sound]")?.addEventListener("click", () => {
    const on = !("soundOn" in tile.dataset);
    for (const other of tiles) if (other !== tile) setSound(other, false);
    setSound(tile, on);
    if (on) {
      inView.add(tile);
      delete tile.dataset.blocked;
      play(tile);
    }
  });
}

// A module, so the `declare global` above applies.
export {};
