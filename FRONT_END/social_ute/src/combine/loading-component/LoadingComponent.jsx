import clsx from 'clsx'
import LoadingDotV2 from 'components/loading/loading-dot-v2'
import { TYPELOADING } from 'constants/type.const'
import { Loader2 } from 'lucide-react'

const Spinner = ({ condition, children, className }) => {
  return condition ? children
    :
    <div className={clsx('w-full h-full flex items-center justify-center', className)}>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
    </div >
}

const Dot = ({ condition, children, className }) => {
  return condition ? children
    :
    <div className={clsx('w-full h-full flex items-center justify-center', className)}>
      <LoadingDotV2 />
    </div >
}

const Title = ({ condition, children, className, title }) => {
  return condition ? children
    :
    <p className={clsx('text-lg font-quick_sans text-center font-bold', className)}>
      {title}
    </p>
}

const Null = ({ condition, children }) => {
  return condition ? children : null
}

const LoadingComponent = ({ type, ...props }) => {
  switch (type) {
    case TYPELOADING.SPINNER:
      return <Spinner {...props} />
    case TYPELOADING.DOT:
      return <Dot {...props} />
    case TYPELOADING.TITLE:
      return <Title {...props} />
    case TYPELOADING.NULL:
      return <Null {...props} />
    default:
      return
  }
}

export default LoadingComponent
