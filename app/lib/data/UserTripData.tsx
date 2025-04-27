import { UserTripData } from '../definitions'

interface SaveUserTripDataProps {
  setUsersTripData: React.Dispatch<React.SetStateAction<UserTripData[]>>
  setIsTravelerFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedUser: React.Dispatch<
    React.SetStateAction<UserTripData | undefined>
  >
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  showToast: (message: string, type: 'success' | 'error') => void
  selectedUser?: UserTripData
  data: Omit<UserTripData, 'id'>
}

export interface DeleteUserTripDataProps {
  id: string
  setUsersTripData: React.Dispatch<React.SetStateAction<UserTripData[]>>
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  showToast: (message: string, type: 'success' | 'error') => void
}

export const saveUserTripData = async ({
  selectedUser,
  setIsSubmitting,
  setUsersTripData,
  showToast,
  setIsTravelerFormOpen,
  setSelectedUser,
  data,
}: SaveUserTripDataProps): Promise<void> => {
  setIsSubmitting(true)
  try {
    const method = selectedUser ? 'PUT' : 'POST'
    const url = selectedUser
      ? `/api/userTripData/${selectedUser.id}`
      : '/api/userTripData'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const updatedData: UserTripData[] = await response.json()
      setUsersTripData((prevData) =>
        selectedUser
          ? prevData.map((user) =>
              user.id === selectedUser.id ? updatedData[0] : user
            )
          : [...prevData, ...updatedData]
      )
      showToast(
        selectedUser ? 'Datos actualizados' : 'Gracias por sumarte',
        'success'
      )
      setIsTravelerFormOpen(false)
      setSelectedUser(undefined)
    } else {
      showToast('Error al guardar los datos', 'error')
    }
  } catch (error) {
    showToast('Error al guardar los datos', 'error')
  } finally {
    setIsSubmitting(false)
  }
}

export const deleteUserTripData = async ({
  id,
  setUsersTripData,
  setIsDeleteModalOpen,
  showToast,
}: DeleteUserTripDataProps): Promise<void> => {
  setIsDeleteModalOpen(true)
  try {
    const response = await fetch(`/api/userTripData/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el registro')
    }

    setUsersTripData((prevItems) => prevItems.filter((item) => item.id !== id))

    showToast('Viajero eliminado', 'success')
    console.log('Registro eliminado correctamente')
  } catch (error) {
    console.error('Error en la eliminación:', error)
    showToast('Error en la eliminación', 'error')
  } finally {
    setIsDeleteModalOpen(false)
  }
}
