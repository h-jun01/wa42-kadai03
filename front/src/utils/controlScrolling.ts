const handleTouchMove = (event: { preventDefault: () => void }): void => {
  event.preventDefault();
};

export const noScroll = (): void => {
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("mousewheel", handleTouchMove, {
    passive: false,
  });
};

export const retrunScroll = (): void => {
  document.removeEventListener("touchmove", handleTouchMove, {
    passive: false,
  } as object);
  document.removeEventListener("mousewheel", handleTouchMove, {
    passive: false,
  } as object);
};
