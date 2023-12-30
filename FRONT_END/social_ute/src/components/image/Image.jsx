
import { localeOption } from 'components/api/Locale';
import PrimeReact from 'components/api/PrimeReact';
import { PrimeReactContext } from 'components/api/PrimeReactContext';
import { useHandleStyle } from 'components/componentbase/ComponentBase';
import { CSSTransition } from 'components/csstransition/CSSTransition';
import { ESC_KEY_HANDLING_PRIORITIES, useGlobalOnEscapeKey } from 'hook/useGlobalOnEscapeKey';
import { useUnmountEffect } from 'hook/useUnmountEffect';
import { Download, Eye, RefreshCw, Undo, XCircle, ZoomIn, ZoomOut } from 'lucide-react';
import { Portal } from 'portal/Portal';
import * as React from 'react';
import { classNames } from 'utils/ClassNames';
import DomHandler from 'utils/DomHandler';
import IconUtils from 'utils/IconUtils';
import { mergeProps } from 'utils/MergeProps';
import ObjectUtils from 'utils/ObjectUtils';
import { ZIndexUtils } from 'utils/ZIndexUtils';
import { ImageBase } from './ImageBase';

const Image = React.memo(
    React.forwardRef((inProps, ref) => {
        const context = React.useContext(PrimeReactContext);
        const props = ImageBase.getProps(inProps, context);

        const [maskVisibleState, setMaskVisibleState] = React.useState(false);
        const [previewVisibleState, setPreviewVisibleState] = React.useState(false);
        const [rotateState, setRotateState] = React.useState(0);
        const [scaleState, setScaleState] = React.useState(1);
        const elementRef = React.useRef(null);
        const imageRef = React.useRef(null);
        const maskRef = React.useRef(null);
        const previewRef = React.useRef(null);
        const previewClick = React.useRef(false);

        const zoomOutDisabled = scaleState <= 0.5;
        const zoomInDisabled = scaleState >= 1.5;

        useGlobalOnEscapeKey({
            callback: () => {
                if (props.closeOnEscape) {
                    hide();
                }
            },
            when: maskVisibleState,
            priority: [
                ESC_KEY_HANDLING_PRIORITIES.IMAGE,
                // Assume that there could be only one image mask activated, so it's safe
                // to provide one and the same priority all the time:
                0
            ]
        });

        const { ptm, cx, sx, isUnstyled } = ImageBase.setMetaData({
            props,
            state: {
                maskVisible: maskVisibleState,
                previewVisible: previewVisibleState,
                rotate: rotateState,
                scale: scaleState
            }
        });

        useHandleStyle(ImageBase.css.styles, isUnstyled, { name: 'image' });

        const show = () => {
            if (props.preview) {
                setMaskVisibleState(true);
                DomHandler.blockBodyScroll();
                setTimeout(() => {
                    setPreviewVisibleState(true);
                }, 25);
            }
        };

        const hide = () => {
            if (!previewClick.current) {
                setPreviewVisibleState(false);
                DomHandler.unblockBodyScroll();
                setRotateState(0);
                setScaleState(1);
            }

            previewClick.current = false;
        };

        const onPreviewImageClick = () => {
            previewClick.current = true;
        };

        const onDownload = () => {
            const { alt: name, src } = props;

            DomHandler.saveAs({ name, src });
            previewClick.current = true;
        };

        const rotateRight = () => {
            setRotateState((prevRotate) => prevRotate + 90);
            previewClick.current = true;
        };

        const rotateLeft = () => {
            setRotateState((prevRotate) => prevRotate - 90);
            previewClick.current = true;
        };

        const zoomIn = () => {
            setScaleState((prevScale) => {
                if (zoomInDisabled) return prevScale;

                return prevScale + 0.1;
            });
            previewClick.current = true;
        };

        const zoomOut = () => {
            setScaleState((prevScale) => {
                if (zoomOutDisabled) return prevScale;

                return prevScale - 0.1;
            });
            previewClick.current = true;
        };

        const onEntering = () => {
            ZIndexUtils.set('modal', maskRef.current, (context && context.autoZIndex) || PrimeReact.autoZIndex, (context && context.zIndex['modal']) || PrimeReact.zIndex['modal']);
        };

        const onEntered = () => {
            props.onShow && props.onShow();
        };

        const onExit = () => {
            DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
        };

        const onExiting = () => {
            props.onHide && props.onHide();
        };

        const onExited = () => {
            ZIndexUtils.clear(maskRef.current);

            setMaskVisibleState(false);
        };

        useUnmountEffect(() => {
            maskRef.current && ZIndexUtils.clear(maskRef.current);
        });

        const createPreview = () => {
            const buttonProps = mergeProps(
                {
                    className: cx('button'),
                    onClick: show
                },
                ptm('button')
            );

            if (props.preview) {
                return <div {...buttonProps}>{content}</div>;
            }

            return null;
        };

        const createElement = () => {
            const { downloadable, alt, crossOrigin, referrerPolicy, useMap, loading } = props;
            const downloadIconProps = mergeProps(ptm('downloadIcon'));
            const rotateRightIconProps = mergeProps(ptm('rotateRightIcon'));
            const rotateLeftIconProps = mergeProps(ptm('rotateLeftIcon'));
            const zoomOutIconProps = mergeProps(ptm('zoomOutIcon'));
            const zoomInIconProps = mergeProps(ptm('zoomInIcon'));
            const closeIconProps = mergeProps(ptm('closeIcon'));
            const downloadIcon = IconUtils.getJSXIcon(props.downloadIcon || <Download size={20} strokeWidth={1} />, { ...downloadIconProps }, { props });
            const rotateRightIcon = IconUtils.getJSXIcon(props.rotateRightIcon || <RefreshCw size={20} strokeWidth={1} />, { ...rotateRightIconProps }, { props });
            const rotateLeftIcon = IconUtils.getJSXIcon(props.rotateLeftIcon || <Undo size={20} strokeWidth={1} />, { ...rotateLeftIconProps }, { props });
            const zoomOutIcon = IconUtils.getJSXIcon(props.zoomOutIcon || <ZoomOut size={20} strokeWidth={1} />, { ...zoomOutIconProps }, { props });
            const zoomInIcon = IconUtils.getJSXIcon(props.zoomInIcon || <ZoomIn size={20} strokeWidth={1} />, { ...zoomInIconProps }, { props });
            const closeIcon = IconUtils.getJSXIcon(props.closeIcon || <XCircle size={20} strokeWidth={1} />, { ...closeIconProps }, { props });

            const maskProps = mergeProps(
                {
                    ref: maskRef,
                    className: cx('mask'),
                    onPointerUp: hide
                },
                ptm('mask')
            );

            const toolbarProps = mergeProps(
                {
                    className: cx('toolbar')
                },
                ptm('toolbar')
            );

            const downloadButtonProps = mergeProps(
                {
                    className: cx('downloadButton'),
                    onPointerUp: onDownload,
                    type: 'button'
                },
                ptm('downloadButton')
            );

            const rotateRightButtonProps = mergeProps(
                {
                    className: cx('rotateRightButton'),
                    onPointerUp: rotateRight,
                    type: 'button'
                },
                ptm('rotateRightButton')
            );

            const rotateLeftButtonProps = mergeProps(
                {
                    className: cx('rotateLeftButton'),
                    onPointerUp: rotateLeft,
                    type: 'button'
                },
                ptm('rotateLeftButton')
            );

            const zoomOutButtonProps = mergeProps(
                {
                    className: classNames(cx('zoomOutButton'), { 'p-disabled': zoomOutDisabled }),
                    style: { pointerEvents: 'auto' },
                    onPointerUp: zoomOut,
                    type: 'button',
                    disabled: zoomOutDisabled
                },
                ptm('zoomOutButton')
            );

            const zoomInButtonProps = mergeProps(
                {
                    className: classNames(cx('zoomInButton'), { 'p-disabled': zoomInDisabled }),
                    style: { pointerEvents: 'auto' },
                    onPointerUp: zoomIn,
                    type: 'button',
                    disabled: zoomInDisabled
                },
                ptm('zoomInButton')
            );

            const closeButtonProps = mergeProps(
                {
                    className: cx('closeButton'),
                    type: 'button',
                    'aria-label': localeOption('close')
                },
                ptm('closeButton')
            );

            const previewProps = mergeProps(
                {
                    src: props.zoomSrc || props.src,
                    className: cx('preview'),
                    style: sx('preview', { rotateState, scaleState }),
                    onPointerUp: onPreviewImageClick,
                    crossOrigin: crossOrigin,
                    referrerPolicy: referrerPolicy,
                    useMap: useMap,
                    loading: loading
                },
                ptm('preview')
            );
            const previewContainerProps = mergeProps(
                {
                    ref: previewRef
                },
                ptm('previewContainer')
            );

            const transitionProps = mergeProps(
                {
                    classNames: cx('transition'),
                    in: previewVisibleState,
                    timeout: { enter: 150, exit: 150 },
                    unmountOnExit: true,
                    onEntering: onEntering,
                    onEntered: onEntered,
                    onExit: onExit,
                    onExiting: onExiting,
                    onExited: onExited
                },
                ptm('transition')
            );

            return (
                <div {...maskProps}>
                    <div {...toolbarProps}>
                        {downloadable && <button {...downloadButtonProps}>{downloadIcon}</button>}
                        <button {...rotateRightButtonProps}>{rotateRightIcon}</button>
                        <button {...rotateLeftButtonProps}>{rotateLeftIcon}</button>
                        <button {...zoomOutButtonProps}>{zoomOutIcon}</button>
                        <button {...zoomInButtonProps}>{zoomInIcon}</button>
                        <button {...closeButtonProps}>{closeIcon}</button>
                    </div>
                    <CSSTransition nodeRef={previewRef} {...transitionProps}>
                        <div {...previewContainerProps}>
                            <img alt={alt} {...previewProps} />
                        </div>
                    </CSSTransition>
                </div>
            );
        };

        React.useImperativeHandle(ref, () => ({
            props,
            show,
            hide,
            getElement: () => elementRef.current,
            getImage: () => imageRef.current
        }));

        const { src, alt, width, height, crossOrigin, referrerPolicy, useMap, loading } = props;
        const element = createElement();
        const iconProp = mergeProps(
            {
                className: cx('icon')
            },
            ptm('icon')
        );
        const icon = props.indicatorIcon || <Eye {...iconProp} />;
        const indicatorIcon = IconUtils.getJSXIcon(icon, { ...iconProp }, { props });
        const content = props.template ? ObjectUtils.getJSXElement(props.template, props) : indicatorIcon;
        const preview = createPreview();
        const imageProp = mergeProps(
            {
                ref: imageRef,
                src: src,
                className: props.imageClassName,
                width: width,
                height: height,
                crossOrigin: crossOrigin,
                referrerPolicy: referrerPolicy,
                useMap: useMap,
                loading: loading,
                style: props.imageStyle,
                onError: props.onError
            },
            ptm('image')
        );
        const image = props.src && <img {...imageProp} alt={alt} />;

        const rootProps = mergeProps(
            {
                ref: elementRef,
                className: cx('root')
            },
            ImageBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <span {...rootProps}>
                {image}
                {preview}
                {maskVisibleState && <Portal element={element} appendTo={document.body} />}
            </span>
        );
    })
);

Image.displayName = 'Image';

export default Image
