import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import "react-datepicker/dist/react-datepicker.css";
import { RootState } from "../../../store";
import CurrencyInput from "react-currency-input-field";

const validationSchema = Yup.object({
  userId: Yup.string().required("Investor is required"),
  amount: Yup.string().required("Amount is required"),
});

const initialValues = {
  userId: "",
  amount: "",
  description: "",
};

interface FormValues {
  userId: string;
  amount: string;
  description: string;
}

interface FormProps {
  initialData?: FormValues;
}

const Form = forwardRef(({ initialData }: FormProps, ref) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.users);

  const formik = useFormik<FormValues>({
    initialValues: initialData || initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      if (initialData) {
        dispatch({
          type: SAGA_ACTIONS.EDIT_INVESTMENT,
          payload: { ...initialData, ...values },
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_INVESTMENT,
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
      <div className='row mb-6'>
        <div className='col-md-6'>
          <label className='form-label'>Investors</label>
          <select
            name='userId'
            className='form-select'
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=''>--- Select Investor ---</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          {formik.touched.userId && formik.errors.userId ? (
            <div className='text-danger'>{formik.errors.userId}</div>
          ) : null}
        </div>

        <div className='col-md-6'>
          <label className='form-label'>Amount</label>
          <CurrencyInput
            id='amount'
            name='amount'
            prefix='₦'
            className='form-control'
            placeholder='Enter amount'
            value={formik.values.amount}
            decimalsLimit={2}
            onValueChange={(value) => {
              formik.setFieldValue("amount", value);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className='text-danger'>{formik.errors.amount}</div>
          ) : null}
        </div>
      </div>

      <div className='mb-10'>
        <label className='form-label'>Description</label>
        <textarea
          name='description'
          className='form-control'
          placeholder='Provide description here...'
          rows={5}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className='text-danger'>{formik.errors.description}</div>
        ) : null}
      </div>
    </form>
  );
});

export default Form;
