import Link from 'next/link'
import clsx from 'clsx'
import Button from './Button'
interface TripCardProps {
  className?: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

const TripCard: React.FC<TripCardProps> = ({
  className,
  title,
  icon,
  description,
  href,
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-white text-slate-700 p-6 flex flex-col space-y-6 sm:w-lg w-full',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span className="text-5xl">{icon}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div>{description}</div>
      <Link href={href} className=" self-end">
        <Button color="primary" size="small" label="Me interesa" />
      </Link>
    </div>
  )
}

export default TripCard
