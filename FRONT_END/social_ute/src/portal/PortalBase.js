import ObjectUtils from "utils/ObjectUtils";

export const PortalBase = {
  defaultProps: {
    __TYPE: "Portal",
    element: null,
    appendTo: null,
    visible: false,
    onMounted: null,
    onUnmounted: null,
    children: undefined,
  },
  getProps: (props) =>
    ObjectUtils.getMergedProps(props, PortalBase.defaultProps),
  getOtherProps: (props) =>
    ObjectUtils.getDiffProps(props, PortalBase.defaultProps),
};
