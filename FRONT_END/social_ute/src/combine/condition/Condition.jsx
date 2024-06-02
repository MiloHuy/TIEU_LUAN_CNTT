
const Show = ({ condition, children, fallback = null }) => {
  return (
    condition ? children : fallback
  )
}

const Hide = ({ condition, children, fallback = null }) => {
  return (
    condition ? fallback : children
  )
}

export const Condition = {
  Show,
  Hide
}
