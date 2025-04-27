'use client'

import { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onRefresh?: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({
  onClose,
  // onRefresh,
  children,
  title,
  isOpen,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-2xl shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full 
          ${isOpen ? 'animate-fade-in' : 'opacity-0'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-2xl">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 w-full">
                <h3
                  className="text-lg leading-6 font-bold text-center text-slate-700"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="my-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
