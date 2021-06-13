import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
export default function FlashCardItem({
  children: flashCard,
  onEdit = null,
  onDelete = null,
}) {
  const { title, description } = flashCard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }
  return (
    <div className="border m-1 p-1">
      <ul className="flex flex-col space-y-1">
        <li>
          <strong>Title:</strong> <span>{title}</span>
        </li>
        <li>
          <strong>Description:</strong> <span>{description}</span>
        </li>
      </ul>
      <div className=" flex flex-row m-1">
        <BiEdit onClick={handleEditIconClick} className="mr-1 cursor-pointer" />
        <MdDeleteForever
          onClick={handleDeleteIconClick}
          className="cursor-pointer"
        ></MdDeleteForever>
      </div>
    </div>
  );
}
