import React, { ElementType, useRef, useState } from "react";
import { KTIcon } from "../../../helpers";
import Modal from "../../../../app/components/Modal";
import {
  addSpaceBeforeUppercase,
  capitalizeFirstLetter,
  formatAmount,
} from "../../../../app/utils/helpers";
import Swal from "sweetalert2";

type Data = {
  [key: string]: string | number;
};

type FormRef = {
  submitForm: () => void;
};

type Props = {
  className: string;
  mainTitle: string;
  tableData: Data[];
  showDetailsBtn?: boolean;
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
  modalTitle: string;
  Form: ElementType;
  onDelete: (id: string | number) => void;
};

const TablesWidget13: React.FC<Props> = ({
  className,
  mainTitle,
  tableData,
  showDetailsBtn = false,
  showEditBtn = true,
  showDeleteBtn = true,
  modalTitle,
  Form,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const formRef = useRef<FormRef>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
      setShowModal(false);
    }
  };

  const handleEdit = (item: Data) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: string | number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your record is safe :)", "error");
      }
    });
  };

  const headers =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter(
          (key) => key !== "id" && !key.endsWith("Id")
        )
      : [];

  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{mainTitle}</span>
          </h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <KTIcon iconName="plus" className="fs-2" />
            Add Record
          </button>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bold text-muted">
                  {headers.map((header) => (
                    <th key={header} className="min-w-120px">
                      {capitalizeFirstLetter(addSpaceBeforeUppercase(header))}
                    </th>
                  ))}
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    {headers.map((header) => (
                      <td className="text-gray-900 fs-6" key={header}>
                        {header === "amount"
                          ? formatAmount(data[header])
                          : data[header]}
                      </td>
                    ))}
                    <td className="text-end">
                      {showDetailsBtn && (
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <KTIcon iconName="switch" className="fs-3" />
                        </a>
                      )}
                      {showEditBtn && (
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => handleEdit(data)}
                        >
                          <KTIcon iconName="pencil" className="fs-3" />
                        </a>
                      )}
                      {showDeleteBtn && (
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          onClick={() => handleDelete(data.id)}
                        >
                          <KTIcon iconName="trash" className="fs-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>

      <Modal
        title={(selectedItem ? "Edit" : "Add") + " " + modalTitle}
        onSubmit={handleSubmit}
        show={showModal}
        handleClose={closeModal}
      >
        <Form ref={formRef} initialData={selectedItem} />
      </Modal>
    </>
  );
};

export { TablesWidget13 };
