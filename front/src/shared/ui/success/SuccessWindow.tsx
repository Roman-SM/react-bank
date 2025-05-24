import "./SuccessWindowStyle.css";
import { ReactComponent as SuccessIcon } from "./success.svg";
import { useEffect, useRef } from "react";

interface SuccessWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessWindow({ isOpen, onClose }: SuccessWindowProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Блокуємо скрол сторінки, коли модалка відкрита
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Автоматичне закриття через 2 секунди
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-window"
      ref={modalRef}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-container">
        <SuccessIcon className="modal-icon" />
        <span className="modal-title">Success</span>
      </div>
    </div>
  );
}
