import React, { ElementType, useRef } from "react";
import { KTIcon } from "../../../helpers";
import Modal from "../../../../app/components/Modal";
import {
  addSpaceBeforeUppercase,
  capitalizeFirstLetter,
} from "../../../../app/utils/helpers";

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
};

const TablesWidget13: React.FC<Props> = ({
  className,
  mainTitle,
  tableData,
  showDetailsBtn = true,
  showEditBtn = true,
  showDeleteBtn = false,
  modalTitle,
  Form,
}) => {
  const formRef = useRef<FormRef>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const headers =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter((key) => key !== "id")
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
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_1"
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
                        {data[header]}
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
                        >
                          <KTIcon iconName="pencil" className="fs-3" />
                        </a>
                      )}
                      {showDeleteBtn && (
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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

      <Modal title={modalTitle} onSubmit={handleSubmit}>
        <Form ref={formRef} />
      </Modal>
    </>
  );
};

export { TablesWidget13 };
