import Modal from "react-modal";
import AddDefaulterForm from "../forms/addDefaulterForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddDefaulterModal = ({ modalIsOpen, closeModal, handleSubmit }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      styles={customStyles}
    >
      <AddDefaulterForm handleSubmit={handleSubmit} />
    </Modal>
  );
};

export default AddDefaulterModal;
