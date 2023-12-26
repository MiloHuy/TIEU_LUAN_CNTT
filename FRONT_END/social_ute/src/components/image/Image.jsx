import classNames from 'classnames';
import RcImage from 'rc-image';
import * as React from 'react';

import { Eye } from 'lucide-react';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import defaultLocale from '../locale/en_US';
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

const Image = (props) => {
    const {
        prefixCls: customizePrefixCls,
        preview,
        className,
        rootClassName,
        style,
        ...otherProps
    } = props;
    const {
        getPrefixCls,
        locale: contextLocale = defaultLocale,
        getPopupContainer: getContextPopupContainer,
        image,
    } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls('image', customizePrefixCls);
    const rootPrefixCls = getPrefixCls();

    const imageLocale = contextLocale.Image || defaultLocale.Image;
    // Style
    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    const mergedRootClassName = classNames(rootClassName, hashId, cssVarCls, rootCls);

    const mergedClassName = classNames(className, hashId, image?.className);

    const [zIndex] = useZIndex(
        'ImagePreview',
        typeof preview === 'object' ? preview.zIndex : undefined,
    );

    const mergedPreview = React.useMemo(() => {
        if (preview === false) {
            return preview;
        }
        const _preview = typeof preview === 'object' ? preview : {};
        const { getContainer, ...restPreviewProps } = _preview;
        return {
            mask: (
                <div className={`${prefixCls}-mask-info`}>
                    <Eye size={20} strokeWidth={1} />
                    {imageLocale?.preview}
                </div>
            ),
            icons,
            ...restPreviewProps,
            getContainer: getContainer || getContextPopupContainer,
            transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
            maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
            zIndex,
        };
    }, [preview, imageLocale]);

    const mergedStyle = { ...image?.style, ...style };

    return wrapCSSVar(
        <RcImage
            prefixCls={prefixCls}
            preview={mergedPreview}
            rootClassName={mergedRootClassName}
            className={mergedClassName}
            style={mergedStyle}
            {...otherProps}
        />,
    );
};

Image.PreviewGroup = PreviewGroup;

export default Image;
