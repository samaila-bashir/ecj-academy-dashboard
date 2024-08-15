import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
});

const initialValues = {
  name: "",
  description: "",
};

interface FormValues {
  name: string;
  description: string;
}

interface FormProps {
  initialData?: FormValues;
}

const Form = forwardRef(({ initialData }: FormProps, ref) => {
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues: initialData || initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      if (initialData) {
        dispatch({
          type: SAGA_ACTIONS.EDIT_EXPENSE_CATEGORY,
          payload: { ...initialData, ...values },
        });

        Swal.fire({
          title: "Success!",
          text: "Expenditure category has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_EXPENSE_CATEGORY,
          payload: values,
        });

        Swal.fire({
          title: "Success!",
          text: "Expenditure category has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      resetForm();
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.submitForm();
    },
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-10">
        <label className="form-label">Category Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter category name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="mb-10">
        <label className="form-label">Category Description</label>
        <textarea
          name="description"
          className="form-control"
          placeholder="Provide a description for this category..."
          rows={5}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-danger">{formik.errors.description}</div>
        ) : null}
      </div>
    </form>
  );
});

export default Form;
