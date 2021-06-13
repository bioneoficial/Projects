export default function FlashCard({
  title = 'Card Title',
  description = 'Card description',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
  id,
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }
  const fontSizeClassName = showFlashCardTitle
    ? 'text-lg font-mono font-semibold'
    : 'font-mono font-semibold text-sm';
  return (
    <div
      className={`border cursor-pointer p-1 m-3 w-64 h-32 shadow-md ${fontSizeClassName}
    flex flex-row items-center justify-center text-center  `}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
