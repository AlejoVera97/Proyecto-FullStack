import clsx from 'clsx'
interface TimelineContentProps {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<TimelineContentProps> = ({ children, className }) => {
  return (
    <div
      className={clsx('w-full xl:max-w-7xl px-6 md:px-10 lg:px-16', className)}
    >
      {children}
    </div>
  )
}

export default Container
