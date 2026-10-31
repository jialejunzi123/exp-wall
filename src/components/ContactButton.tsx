interface ContactButtonProps {
  className?: string
}

export default function ContactButton({ className = '' }: ContactButtonProps) {
  return (
    <button
      type="button"
      className={`contact-button px-7 py-2.5 text-sm sm:px-10 sm:py-3 sm:text-base md:px-12 md:py-4 md:text-lg ${className}`}
    >
      联系我
    </button>
  )
}
