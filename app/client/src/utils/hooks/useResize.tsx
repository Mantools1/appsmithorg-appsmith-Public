import React, { MutableRefObject } from "react";

export enum DIRECTION {
  vertical,
  horizontal,
}

function useResize(
  ref: MutableRefObject<HTMLElement | null>,
  direction: DIRECTION,
) {
  const [mouseDown, setMouseDown] = React.useState(false);

  const pointer =
    direction === DIRECTION.vertical ? "cursor-ns-resize" : "cursor-ew-resize";

  const onMouseMove = (e: MouseEvent) => {
    document.body.classList.add(pointer);
    if (ref.current) {
      const { bottom, left, right, top } = ref.current.getBoundingClientRect();

      const currentMouseYPosition = e.clientY;
      const currentMouseXPosition = e.clientX;

      const distanceYDragged = currentMouseYPosition - bottom;
      const distanceXDragged = currentMouseXPosition - right;

      const currentHeight = bottom - top;
      const currentWidth = right - left;

      if (direction === DIRECTION.vertical) {
        ref.current.style.height = currentHeight + distanceYDragged + "px";
      } else {
        ref.current.style.height = currentWidth + distanceXDragged + "px";
      }
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
    document.body.classList.remove(pointer);
  };

  React.useEffect(() => {
    if (mouseDown) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseDown]);

  return { mouseDown, setMouseDown };
}

export default useResize;
