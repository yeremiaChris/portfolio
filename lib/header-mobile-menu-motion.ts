export type HeaderMobileMenuBarMotion = {
  y?: number;
  rotate?: number;
  opacity?: number;
};

export function headerMobileMenuTopBarMotion(
  open: boolean,
): HeaderMobileMenuBarMotion {
  return {
    y: open ? 0 : -4,
    rotate: open ? 45 : 0,
  };
}

export function headerMobileMenuMiddleBarMotion(
  open: boolean,
): HeaderMobileMenuBarMotion {
  return {
    opacity: open ? 0 : 1,
  };
}

export function headerMobileMenuBottomBarMotion(
  open: boolean,
): HeaderMobileMenuBarMotion {
  return {
    y: open ? 0 : 6,
    rotate: open ? -45 : 0,
  };
}
