import clsx from "clsx"

function ArrayEmpty({ arr, title, className, children }) {
  if (!arr) return

  return (
    arr.length === 0 ?
      <p className={clsx('text-lg font-quick_sans text-center font-bold', className)}>
        {title}
      </p>
      : (children || null)
  )
}

export default ArrayEmpty
