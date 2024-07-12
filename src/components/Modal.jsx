
'use client'
import { Check } from 'phosphor-react'
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'

export const ModalComponent = () => {
  return (
    <Modal>
      <ModalBody>
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-success-100 bg-success-50 text-success-500 dark:border-metal-800 dark:bg-metal-800">
              <Check size={60} />
            </div>
            <div className="space-y-1 text-center">
              <ModalTitle>Payment Successful</ModalTitle>
              <ModalDescription>
                Your document has unsaved changes. Discard or save them as a new page to continue.
              </ModalDescription>
            </div>
          </ModalHeader>
          <ModalFooter className="justify-center">
            <ModalClose asChild>
              <Button size="sm" color="success">
                Confirm
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}