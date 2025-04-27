import clsx from 'clsx'
interface PraiaHeroProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

const PraiaHero: React.FC<PraiaHeroProps> = ({
  title,
  description,
  icon,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center max-w-md',
        className
      )}
    >
      <div className="text-6xl text-slate-700 flex justify-center">{icon}</div>
      <h1 className="text-xl md:text-2xl text-slate-700 font-bold">{title}</h1>
      <p className="text-slate-500 text-sm md:text-base mb-4">{description}</p>
    </div>
  )
}

export default PraiaHero
