import ObjectUtils from "utils/ObjectUtils";

export const CSSTransitionBase = {
  defaultProps: {
    __TYPE: "CSSTransition",
    children: undefined,
  },
  getProps: (props) =>
    ObjectUtils.getMergedProps(props, CSSTransitionBase.defaultProps),
  getOtherProps: (props) =>
    ObjectUtils.getDiffProps(props, CSSTransitionBase.defaultProps),
};
