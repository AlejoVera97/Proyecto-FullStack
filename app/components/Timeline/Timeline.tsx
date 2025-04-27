'use client'

import { useState } from 'react'
import { UserTripData } from '../../lib/definitions'
import Modal from '../ui/Modal'
import TravelerForm from '../Forms/UserTripForm'
import { useToast } from '../../contexts/ToastContext'
import TimeLineHeader from './TimelineHeader'
import TimelineList from './TimelineList'
import SectionTitle from '../ui/SectionTitle'
import { GiWaveSurfer } from 'react-icons/gi'
import Button from '../ui/Button'
import {
  saveUserTripData,
  deleteUserTripData,
} from '@/app/lib/data/UserTripData'

interface TimelineProps {
  initialUsersTripData: UserTripData[]
}

export default function Timeline({ initialUsersTripData }: TimelineProps) {
  const [usersTripData, setUsersTripData] =
    useState<UserTripData[]>(initialUsersTripData)
  const [isTravelerFormOpen, setIsTravelerFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserTripData | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const openFormForNewUser = () => {
    setSelectedUser(undefined)
    setIsTravelerFormOpen(true)
  }

  const openFormForEdit = (user: UserTripData) => {
    setSelectedUser(user)
    setIsTravelerFormOpen(true)
  }
  const openDeletModal = (user: UserTripData) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleSubmit = async (data: Omit<UserTripData, 'id'>) => {
    await saveUserTripData({
      selectedUser,
      setIsSubmitting,
      setUsersTripData,
      showToast,
      setIsTravelerFormOpen,
      setSelectedUser,
      data,
    })
  }

  const handleDelete = async (id: string) => {
    deleteUserTripData({
      id,
      setUsersTripData,
      setIsDeleteModalOpen,
      showToast,
    })
  }

  const startRangeDate = new Date('2025-04-22T00:00:00-03:00')
  const endRangeDate = new Date('2025-05-22T00:00:00-03:00')

  const days = Array.from(
    {
      length:
        (endRangeDate.getTime() - startRangeDate.getTime()) /
          (1000 * 60 * 60 * 24) +
        1,
    },
    (_, i) => new Date(startRangeDate.getTime() + i * (1000 * 60 * 60 * 24))
  )

  return (
    <div className="w-full">
      <SectionTitle
        title="Timeline de Praia do Rosa"
        description="Tiempos de los pibes en Praia do Rosa, Santa Catarina, Brasil."
        icon={<GiWaveSurfer />}
        className="justify-self-center mb-12"
      />

      <TimeLineHeader days={days} />
      <TimelineList
        usersTripData={usersTripData}
        startRangeDate={startRangeDate}
        days={days}
        onEditUser={openFormForEdit}
        onDelete={openDeletModal}
      />

      <div className="mt-8 flex justify-end">
        <Button
          label="Me sumo"
          onClick={openFormForNewUser}
          size="medium"
          variant="solid"
          color="primary"
        />
      </div>

      {isTravelerFormOpen && (
        <Modal
          title={selectedUser ? 'Editar información' : 'Vas a Praia do Rosa?'}
          isOpen={isTravelerFormOpen}
          onClose={() => setIsTravelerFormOpen(false)}
        >
          <TravelerForm
            onSubmit={handleSubmit}
            onCancel={() => setIsTravelerFormOpen(false)}
            isLoading={isSubmitting}
            selectedUser={selectedUser}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          title="Mejor mas olas para nosotros, gracias!"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <p className="text-slate-700">¿Estás seguro que no querés viajar?</p>
          <div className="flex justify-center space-x-2 mt-6">
            <Button
              label="Cancelar"
              onClick={() => setIsDeleteModalOpen(false)}
              color="primary"
              variant="outline"
              className=""
            />
            <Button
              label="Me bajo"
              onClick={() => {
                if (selectedUser) handleDelete(selectedUser.id)
              }}
              color="delete"
              variant="solid"
            />
          </div>
        </Modal>
      )}
    </div>
  )
}
