/**
 * Util
 */
export function calculateTooltipPosition(tooltip, style) {
  let marginLeft = tooltip.clientWidth / 2;
  let marginTop = parseInt(tooltip.style.marginTop);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const left = parseInt(tooltip.style.left);
  const top = parseInt(tooltip.style.top);
  const right = left + tooltip.clientWidth;
  const bottom = top + tooltip.clientHeight;
  // bound to left
  if (marginLeft > left) marginLeft = left;
  // bound to right
  if (right > windowWidth) marginLeft = right - windowWidth + 20;

  if (bottom > windowHeight) {
    tooltip.classList.add(style.top);
    marginTop = (tooltip.clientHeight + 20) * -1;
  }

  tooltip.style.marginLeft = marginLeft * -1;
  tooltip.style.marginTop = marginTop;
}