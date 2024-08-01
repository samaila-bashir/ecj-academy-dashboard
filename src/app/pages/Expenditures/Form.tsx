import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  description: Yup.string().required("Description is required"),
});

const initialValues = {
  category: "",
  amount: "",
  description: "",
};

interface FormValues {
  category: string;
  amount: string;
  description: string;
}

const Form = forwardRef((props, ref) => {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      // Handle form submission
      console.log(values);

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
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-select"
          aria-label="Select category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">--- Select Expense Category ---</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="text-danger">{formik.errors.category}</div>
        ) : null}
      </div>

      <div className="mb-10">
        <label className="form-label">Amount</label>
        <input
          type="text"
          name="amount"
          className="form-control"
          placeholder="Enter amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.amount && formik.errors.amount ? (
          <div className="text-danger">{formik.errors.amount}</div>
        ) : null}
      </div>

      <div className="mb-10">
        <label className="form-label">Expense Description</label>
        <textarea
          name="description"
          className="form-control"
          placeholder="Provide a description for this expense..."
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
