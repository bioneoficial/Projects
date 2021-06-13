export default function Button({
  children: description = 'Button Description',
  onButtonClick = null,
  colorClass = 'bg-gradient-to-r from-green-400 via-green-600 to-green-200',
  hoverClass = 'hover:from-pink-500 hover:to-yellow-500',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <div>
      <button
        type={type}
        className={`p-1 rounded ${colorClass} ${hoverClass}`}
        onClick={handleButtonClick}
      >
        {description}
      </button>
    </div>
  );
}
