import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface ButtonIconProps {
  icon: React.ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  size?: 'small' | 'medium'
  className?: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  href,
  external = false,
  size = 'medium',
  className,
}) => {
  const baseStyle =
    'text-gray-600 hover:text-gray-400 transition duration-200 ease-in-out cursor-pointer'
  const sizeStyle =
    size === 'small' ? 'text-xs md:text-base' : 'text-base md:text-xl'

  const combinedClassName = clsx(baseStyle, sizeStyle, className)

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {icon}
      </a>
    ) : (
      <Link href={href} className={combinedClassName}>
        {icon}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {icon}
    </button>
  )
}

export default ButtonIcon
