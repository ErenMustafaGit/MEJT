export default function ActionButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => any;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled
          ? "cursor-not-allowed bg-rblue-100 hover:bg-rblue-100 active:bg-rblue-100"
          : "bg-rblue-500 hover:bg-rblue-600 active:bg-rblue-700"
      } " block max-w-xs rounded-lg px-3 py-3 text-xs text-white sm:w-full sm:text-base sm:font-semibold ${className}`}
    >
      {disabled ? "Loading" : children}
    </button>
  );
}
