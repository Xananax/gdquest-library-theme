document.querySelectorAll<HTMLVideoElement>('video[data-should-preload]').forEach(video => {
  console.log({video});
  const condition = video.getAttribute('data-should-preload');
  switch (condition) {
    case "onmouseenter":
      video.addEventListener('mouseenter', () => {
        video.preload = 'auto';
      });
      break;
  }
});