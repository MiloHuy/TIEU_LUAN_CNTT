import clsx from 'clsx'
import LoadingDotV2 from 'components/loading/loading-dot-v2'
import PropagateLoader from 'components/loading/propagate-loading/PropagateLoader'
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

const Propagate = ({ condition, children, className }) => {
  return condition ? children
    :
    <div className={clsx('w-full h-full flex items-center justify-center', className)}>
      <PropagateLoader
        color="#9aa19f"
        size={18}
      />
    </div >
}

const Title = ({ condition, children, className, title }) => {
  return condition ? children
    :
    <p className={clsx('text-lg font-quick_sans text-center font-bold', className)}>
      {title ? title : 'Đang lấy dữ liệu'}
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
    case TYPELOADING.PROPAGATE:
      return <Propagate {...props} />
    default:
      return
  }
}

export default LoadingComponent
