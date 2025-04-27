import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import clsx from 'clsx'

interface InputDatePickerProps {
  label?: string
  name: string
  selected: Date | null
  onChange: (date: Date | null) => void
  errorMessage?: string
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  className?: string
}

const InputDatePicker: React.FC<InputDatePickerProps> = ({
  label,
  name,
  selected,
  onChange,
  errorMessage,
  minDate,
  maxDate,
  placeholder = 'dd/mm/yyyy',
  className,
}) => {
  return (
    <div className={clsx(className)}>
      {label && (
        <label
          htmlFor={name}
          className="mb-0 text-sm font-medium text-slate-700 block cursor-pointer"
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <DatePicker
          id={name}
          selected={selected}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          wrapperClassName="w-full"
          className="w-full p-2 border border-slate-500 rounded-md text-slate-700 placeholder-slate-500"
        />
        {errorMessage && (
          <p className="text-xs ml-1 mt-1 text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default InputDatePicker
