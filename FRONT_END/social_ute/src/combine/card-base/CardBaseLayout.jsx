import clsx from "clsx";

const classes = {
  vertical: "flex gap-2 min-w-[200px] min-h-[100px]",
  horizontal: "flex flex-col gap-2 justify-center min-w-[280px] min-h-[350px]",
};

const getCardClass = (align) => classes[align] || classes.vertical;

const CardBaseLayout = ({ align = "vertical", header, body, footer, className, ...props }) => {
  const clsCard = getCardClass(align);

  return (
    <div className={clsx(
      "border border-black/40 dark:border-white rounded-lg p-4 overflow-hidden",
      clsCard, className
    )} {...props}>
      {header && header}

      {body && body}

      {footer && footer}
    </div>
  );
};

export default CardBaseLayout;
