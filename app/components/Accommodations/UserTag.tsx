import clsx from 'clsx'
import { RxCross1 } from 'react-icons/rx'
interface UserTagProps {
  className?: string
  label: string
  onClick?: () => void
}

const UserTag: React.FC<UserTagProps> = ({ className, label, onClick }) => {
  return (
    <div
      className={clsx(
        'flex space-x-2 items-center bg-slate-700 text-white rounded-2xl py-1 px-3',
        className
      )}
    >
      <div className="text-sm">{label}</div>
      <button
        className=" cursor-pointer text-sm hover:text-slate-400 "
        onClick={onClick}
      >
        <RxCross1 />
      </button>
    </div>
  )
}

export default UserTag
