"use client"

import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { submitContactForm } from "@/actions/contact/submit-contact-form"
import { toError } from "@/utils/errors"

type ContactModalProps = {
  teamKey?: string
  subject?: string
  title?: string
  includeTelegramHandle?: boolean
  submitButtonText?: string
}

type Inputs = {
  subject: string
  message: string
  telegramHandle?: string
}

const ContactModal = ({
  teamKey,
  subject,
  title = "Contact us",
  includeTelegramHandle,
  submitButtonText = "Send message",
}: ContactModalProps) => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.Contact

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const handleClose = () => {
    closeModal()
    setTimeout(() => reset(), 200)
  }

  const handleSend: SubmitHandler<Inputs> = async (data) => {
    setIsPending(true)

    try {
      await submitContactForm({
        teamKey,
        subject: subject ?? data.subject,
        message: data.message,
        telegramHandle: data.telegramHandle,
        pageUri: window.location.href.split(/[?#]/)[0],
      })
    } catch (error) {
      setIsPending(false)
      setError("root", {
        type: "serverError",
        message: toError(error).message,
      })

      return
    }

    setIsSuccess(true)
  }

  return (
    <Modal title={isSuccess ? "" : title} open={isOpen} close={closeModal}>
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center mt-8 text-center">
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
            variant="secondary"
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
          <form className="mt-4 space-y-6" onSubmit={handleSubmit(handleSend)}>
            {!subject && (
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
                {!!errors.subject?.message && (
                  <p className="mt-1.5 text-sm font-medium text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            )}

            {includeTelegramHandle && (
              <div>
                <label
                  htmlFor="telegramHandle"
                  className="block text-sm font-medium leading-none text-gray-900"
                >
                  Telegram handle
                </label>
                <input
                  type="text"
                  id="telegramHandle"
                  className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  required
                  {...register("telegramHandle")}
                />
                {!!errors.telegramHandle?.message && (
                  <p className="mt-1.5 text-sm font-medium text-red-500">
                    {errors.telegramHandle.message}
                  </p>
                )}
              </div>
            )}

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
              {!!errors.message?.message && (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" loading={isPending}>
              <PaperAirplaneIcon className="w-5 h-5" />
              {submitButtonText}
            </Button>
          </form>
          {!!errors?.root?.serverError && (
            <p className="mt-4 text-sm font-medium text-red-500">
              {errors.root.serverError.message}
            </p>
          )}
        </>
      )}
    </Modal>
  )
}

export default ContactModal
