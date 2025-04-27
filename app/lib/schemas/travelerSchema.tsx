import * as yup from 'yup'

export const travelerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  startDate: yup
    .date()
    .min(new Date('2025-04-22'), 'La fecha debe ser después del 22/04/2025')
    .max(new Date('2025-05-22'), 'La fecha debe ser antes del 22/05/2025')
    .required('La fecha de salida es obligatoria'),
  endDate: yup
    .date()
    .min(
      yup.ref('startDate'),
      'La fecha de vuelta debe ser después de la salida'
    )
    .max(new Date('2025-05-22'), 'La fecha debe ser antes del 22/05/2025')
    .required('La fecha de vuelta es obligatoria'),
  confirmed: yup.boolean().default(false),
  car: yup.boolean().default(false),
})
