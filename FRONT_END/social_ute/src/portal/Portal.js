import * as React from "react";
import ReactDOM from "react-dom";

import PrimeReact from "components/api/PrimeReact";
import { PrimeReactContext } from "components/api/PrimeReactContext";
import { useMountEffect } from "hook/useMountEffect";
import { useUnmountEffect } from "hook/useUnmountEffect";
import { useUpdateEffect } from "hook/useUpdateEffect";
import DomHandler from "utils/DomHandler";
import ObjectUtils from "utils/ObjectUtils";
import { PortalBase } from "./PortalBase";

export const Portal = React.memo((inProps) => {
  const props = PortalBase.getProps(inProps);
  const context = React.useContext(PrimeReactContext);

  const [mountedState, setMountedState] = React.useState(
    props.visible && DomHandler.isClient(),
  );

  useMountEffect(() => {
    if (DomHandler.isClient() && !mountedState) {
      setMountedState(true);
      props.onMounted && props.onMounted();
    }
  });

  useUpdateEffect(() => {
    props.onMounted && props.onMounted();
  }, [mountedState]);

  useUnmountEffect(() => {
    props.onUnmounted && props.onUnmounted();
  });

  const element = props.element || props.children;

  if (element && mountedState) {
    let appendTo =
      props.appendTo || (context && context.appendTo) || PrimeReact.appendTo;

    if (ObjectUtils.isFunction(appendTo)) {
      appendTo = appendTo();
    }

    if (!appendTo) {
      appendTo = document.body;
    }

    return appendTo === "self"
      ? element
      : ReactDOM.createPortal(element, appendTo);
  }

  return null;
});

Portal.displayName = "Portal";
