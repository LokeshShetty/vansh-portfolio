// Muted, looping videos (`video[data-autoplay]`) play while on screen and
// pause off screen. They use preload="none", so nothing downloads until a
// video first scrolls into view. Visitors who ask for reduced motion get
// the poster and native controls instead.
const videos = document.querySelectorAll<HTMLVideoElement>(
  "video[data-autoplay]",
);

if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (const video of videos) video.controls = true;
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }
    },
    { threshold: 0.25 },
  );
  for (const video of videos) observer.observe(video);
}

// Sound toggles sit next to their video, inside the same wrapper.
for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-sound]",
)) {
  const video = button.parentElement?.querySelector("video");
  if (!video) continue;
  button.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) video.play().catch(() => {});
    button.setAttribute("aria-pressed", String(!video.muted));
  });
}
