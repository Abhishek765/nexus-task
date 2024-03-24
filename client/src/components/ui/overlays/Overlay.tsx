import React, { useRef } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void | null;
  children: React.ReactNode;
}

const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target && onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center px-4"
          ref={modalRef}
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-md m-4">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-black hover:text-gray-800 focus:outline-none"
            >
              &#10005;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
