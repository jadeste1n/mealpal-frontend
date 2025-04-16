// components/Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
	//manage modal visibility with react states
	if (!isOpen) return null; //dont render if not in open state

	return (
		<div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="modal-box  p-12 rounded-xl shadow-xl max-w-lg w-full text-left">
				{children}
				<div className="modal-action mt-4">
					<button className="btn" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
