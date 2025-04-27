import clsx from 'clsx'

interface InputCheckboxProps {
  label: string
  name: string
  register: any
  className?: string
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  label,
  name,
  register,
  className,
}) => {
  return (
    <label
      className={clsx(
        'flex items-center space-x-2  cursor-pointer text-sm font-medium text-slate-700',
        className
      )}
    >
      <input type="checkbox" className="border-slate-500" {...register(name)} />
      <span>{label}</span>
    </label>
  )
}

export default InputCheckbox
