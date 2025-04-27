'use client'

import { UserTripData } from '../../lib/definitions'
import 'react-datepicker/dist/react-datepicker.css'
import { travelerSchema } from '../../lib/schemas/travelerSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '../ui/Button'
import InputText from '../ui/InputText'
import InputDatePicker from '../ui/InputDatePicker'
import InputCheckbox from '../ui/InputCheckbox'

interface TravelerFormProps {
  selectedUser?: UserTripData
  onSubmit: (formData: Omit<UserTripData, 'id'>) => void
  onCancel: () => void
  isLoading: boolean
}

export default function TravelerForm({
  onSubmit,
  selectedUser,
  onCancel,
  isLoading = false,
}: TravelerFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(travelerSchema),
    defaultValues: selectedUser || {
      name: '',
      startDate: undefined,
      endDate: undefined,
      confirmed: false,
      car: false,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col text-left"
    >
      <InputText
        label="Nombre"
        name="name"
        placeholder="Nombre"
        register={register}
        errorMessage={errors.name?.message}
      />
      <InputDatePicker
        name="startDate"
        label="Fecha de salida"
        selected={watch('startDate') ? new Date(watch('startDate')) : null}
        onChange={(date) =>
          date ? setValue('startDate', date || undefined) : null
        }
        minDate={new Date('2025-04-22')}
        maxDate={
          watch('endDate') ? new Date(watch('endDate')) : new Date('2025-05-22')
        }
        errorMessage={errors.startDate?.message}
      />
      <InputDatePicker
        name="endDate"
        label="Fecha de vuelta"
        selected={watch('endDate') ? new Date(watch('endDate')) : null}
        onChange={(date) =>
          date ? setValue('endDate', date || undefined) : null
        }
        placeholder="dd/mm/yyyy"
        minDate={
          watch('startDate')
            ? new Date(watch('startDate'))
            : new Date('2025-04-22')
        }
        maxDate={new Date('2025-05-22')}
        errorMessage={errors.endDate?.message}
      />
      <div className="flex flex-col sm:flex-row space-y-6 space-x-0 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
        <InputCheckbox
          name="confirmed"
          label="Vas seguro?"
          register={register}
        />

        <div className="flex md:flex-row">
          <InputCheckbox name="car" label="Pones auto?" register={register} />
          {/* <select><select/> */}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          label="Cancelar"
          onClick={onCancel}
          color="primary"
          variant="outline"
        />

        <Button
          label={selectedUser ? 'Actualizar' : 'Nos vemo ahi'}
          type="submit"
          color="confirm"
          variant="solid"
          isDisabled={isLoading}
        />
      </div>
    </form>
  )
}
