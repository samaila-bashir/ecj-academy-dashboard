import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { RootState } from "../../../store";

const validationSchema = Yup.object({
  categoryId: Yup.string().required("Category is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  description: Yup.string().required("Description is required"),
});

const initialValues = {
  categoryId: "",
  amount: "",
  description: "",
};

interface FormValues {
  categoryId: string;
  amount: string;
  description: string;
}

interface FormProps {
  initialData?: FormValues;
}

const Form = forwardRef(({ initialData }: FormProps, ref) => {
  const dispatch = useDispatch();

  const { categories } = useSelector(
    (state: RootState) => state.expenseCategory
  );

  const formik = useFormik<FormValues>({
    initialValues: initialData || initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      if (initialData) {
        dispatch({
          type: SAGA_ACTIONS.EDIT_EXPENDITURE,
          payload: { ...initialData, ...values },
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_EXPENDITURE,
          payload: values,
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
        <label className="form-label">Category</label>
        <select
          name="categoryId"
          className="form-select"
          aria-label="Select category"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">--- Select Expense Category ---</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId ? (
          <div className="text-danger">{formik.errors.categoryId}</div>
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
