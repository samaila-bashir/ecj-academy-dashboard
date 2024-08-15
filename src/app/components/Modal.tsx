import { FC, ReactNode } from "react";
import { KTSVG } from "../../_metronic/helpers";
import { Modal as BModal } from "react-bootstrap";
import { createPortal } from "react-dom";

interface IModal {
  title: string;
  onSubmit: () => void;
  children: ReactNode;
  show: boolean;
  handleClose: () => void;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const Modal: FC<IModal> = ({
  title,
  onSubmit,
  children,
  show,
  handleClose,
}) => {
  return createPortal(
    <BModal
      className="modal fade"
      id="kt_header_search_modal"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-700px"
      role="dialog"
      tabIndex={-1}
      data-backdrop="static"
      show={show}
      onHide={handleClose}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <KTSVG
              path="media/icons/duotune/arrows/arr061.svg"
              className="svg-icon svg-icon-2x"
            />
          </div>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </BModal>,
    modalsRoot
  );
};

export default Modal;
