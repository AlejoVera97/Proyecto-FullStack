import clsx from 'clsx'
import Link from 'next/link'

interface ButtonProps {
  label: string
  onClick?: () => void
  type?: 'submit'
  href?: string
  isExternal?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  color?: 'primary' | 'delete' | 'confirm'
  variant?: 'solid' | 'outline'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = 'primary',
  variant = 'solid',
  size = 'medium',
  onClick,
  type,
  href,
  isExternal,
  isDisabled,
  isLoading,
  className,
}) => {
  const baseStyle =
    'font-bold inline-flex items-center justify-center rounded-2xl transition duration-200 ease-in-out'

  const sizeStyles = {
    small: 'text-sm px-4 py-2 w-full sm:w-auto',
    medium: 'text-md px-6 py-3 w-full sm:w-auto',
    large: 'text-lg px-8 py-4 w-full sm:w-auto',
  }

  const colorStyles: Record<string, { solid: string; outline: string }> = {
    primary: {
      solid: 'bg-slate-700 text-white hover:bg-slate-600 focus:bg-slate-500',
      outline:
        'border border-slate-700 text-slate-700 hover:text-white hover:bg-slate-700 focus:bg-slate-500',
    },
    delete: {
      solid: 'bg-red-700 text-white hover:bg-red-500 focus:bg-red-400',
      outline: 'border border-red-700 text-red-700 hover:bg-red-300',
    },
    confirm: {
      solid:
        'bg-emerald-600 text-white hover:bg-emerald-300 hover:text-slate-700 focus:bg-emerald-400',
      outline:
        'border border-emerald-600 text-emerald-500 hover:text-white hover:bg-emerald-600',
    },
  }

  const combinedClassName = clsx(
    baseStyle,
    sizeStyles[size],
    colorStyles[color][variant],
    className,
    {
      'opacity-50  cursor-not-allowed': isDisabled || isLoading,
      'cursor-pointer': !isDisabled && !isLoading,
    }
  )

  const content = isLoading ? 'Loading...' : label

  if (href) {
    return href.startsWith('/') ? (
      <Link
        className={combinedClassName}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </Link>
    ) : (
      <a
        className={combinedClassName}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
    >
      {content}
    </button>
  )
}

export default Button
