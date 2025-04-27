import clsx from 'clsx'
interface InputTextProps {
  label?: string
  name: string
  placeholder?: string
  errorMessage?: string
  size?: 'small' | 'medium' | 'large'
  register?: any
  className?: string
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  errorMessage,
  size = 'medium',
  register,
  className,
}) => {
  const baseStyle =
    'text-slate-700 bg-white placeholder-slate-500 w-full border border-slate-500 rounded-md'

  const sizeStyle =
    size === 'small'
      ? 'px-2 py-1 text-sm'
      : size === 'large'
      ? 'px-4 py-3 text-lg'
      : 'px-3 py-2 text-base'

  return (
    <div className={clsx(className)}>
      {label && (
        <label
          htmlFor={name}
          className="cursor-pointer text-sm font-medium text-slate-700 mb-1 block"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        className={clsx(baseStyle, sizeStyle)}
      />
      {errorMessage && (
        <p className="text-xs text-red-600 mt-1 ml-1">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputText
