"use client"

import {
  CheckCircleIcon,
  LifebuoyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { Modals, useModals } from "@/hooks/useModals"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { usePathname } from "next/navigation"

type Inputs = {
  subject: string
  message: string
}

const ContactModal = () => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.Contact
  const page = usePathname()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isValid, isSubmitSuccessful },
  } = useForm<Inputs>()

  const handleClose = () => {
    closeModal()
    setTimeout(() => reset(), 200)
  }

  const sendMessage: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, page }),
      })

      const { message } = await res.json()

      if (!res.ok) throw new Error(message)
    } catch (error: any) {
      return setError("root.serverError", {
        message: error.message,
      })
    }
  }

  return (
    <Modal
      title={isSubmitSuccessful ? "" : "Contact us"}
      open={isOpen}
      close={closeModal}
    >
      {isSubmitSuccessful ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <CheckCircleIcon
            className="w-8 h-8 text-green-600"
            aria-hidden="true"
          />
          <h2 className="mt-3 text-base font-medium leading-4 text-gray-900">
            Message sent!
          </h2>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            We will respond within 24 hours.
          </p>
          <Button
            onClick={handleClose}
            size="sm"
            className="mt-4"
            style="secondary"
          >
            Close
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            We’re here to help! Fill out this quick form and you’ll hear from us
            within 24 hours.
          </p>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit(sendMessage)}>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium leading-none text-gray-900"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                required
                {...register("subject", {
                  required: "Please enter a subject for your message.",
                })}
              />
              {errors.subject?.message && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-none text-gray-900"
              >
                Message
              </label>
              <textarea
                id="message"
                className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Your message..."
                rows={5}
                required
                {...register("message", {
                  required: "Please enter a message.",
                })}
              />
              {errors.message?.message && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={!isValid} loading={isSubmitting}>
              <PaperAirplaneIcon className="w-5 h-5" />
              Send message
            </Button>
          </form>
          {errors?.root?.serverError ? (
            <p className="mt-4 text-sm font-medium text-red-500">
              {errors.root.serverError.message}
            </p>
          ) : null}
        </>
      )}
    </Modal>
  )
}

const Contact = ({
  text = "Need help setting up deals?",
}: {
  text?: string
}) => {
  const { openModal } = useModals()

  return (
    <>
      <section className="flex items-start justify-between gap-3 p-4 bg-gray-100 border border-gray-200 rounded-md sm:p-5 md:p-6 sm:items-center sm:gap-5">
        <LifebuoyIcon className="flex-shrink-0 w-8 h-8 text-gray-500 sm:h-11 sm:w-11" />
        <div className="flex flex-col items-start justify-between flex-1 gap-y-3 sm:items-center sm:flex-row">
          <div>
            <p className="text-base font-medium leading-none text-gray-900">
              {text}
            </p>
            <p className="mt-2 text-sm leading-5 text-gray-500">
              Reach out to our support team to get assistance.
            </p>
          </div>
          <Button
            className="flex-shrink-0"
            onClick={() => openModal(Modals.Contact)}
            style="border"
            size="sm"
          >
            Contact us
          </Button>
        </div>
      </section>
      <ContactModal />
    </>
  )
}

export default Contact
