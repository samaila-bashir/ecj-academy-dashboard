import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { states } from "../../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  stateOfOrigin: Yup.string().required("State of origin is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  dob: Yup.date().required("Date of birth is required"),
  contactPerson: Yup.string().required("Contact person is required"),
  jerseyNumber: Yup.string().required("Jersey number is required"),
  nickName: Yup.string(),
  homeAddress: Yup.string().required("Home address is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  stateOfOrigin: "",
  phoneNumber: "",
  dob: null,
  contactPerson: "",
  jerseyNumber: "",
  nickName: "",
  homeAddress: "",
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  stateOfOrigin: string;
  phoneNumber: string;
  dob: Date | null;
  contactPerson: string;
  jerseyNumber: string;
  nickName: string;
  homeAddress: string;
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
          type: SAGA_ACTIONS.EDIT_PLAYER,
          payload: { ...initialData, ...values },
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_PLAYER,
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
      <div className='row mb-8'>
        <TextInput
          label='First Name'
          type='text'
          name='firstName'
          placeholder='Enter First Name'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
        <TextInput
          label='Last Name'
          type='text'
          name='lastName'
          placeholder='Enter Last Name'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
      </div>

      <div className='row mb-8'>
        <div className='col-md-6'>
          <label className='form-label'>State of Origin</label>
          <select
            name='stateOfOrigin'
            className='form-select'
            aria-label='Select State'
            value={formik.values.stateOfOrigin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=''>--- Select State ---</option>
            {states.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>
          {formik.touched.stateOfOrigin && formik.errors.stateOfOrigin ? (
            <div className='text-danger'>{formik.errors.stateOfOrigin}</div>
          ) : null}
        </div>
        <TextInput
          label='Email'
          type='email'
          name='email'
          placeholder='Enter Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>

      <div className='row mb-8'>
        <TextInput
          label='Phone Number'
          type='text'
          name='phoneNumber'
          placeholder='Enter Phone Number'
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
        />

        <TextInput
          label='Nickname (Optional)'
          type='text'
          name='nickName'
          placeholder='Enter Nickname'
          value={formik.values.nickName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.nickName}
          touched={formik.touched.nickName}
        />
      </div>

      <div className='row mb-8'>
        <TextInput
          label='Contact Person'
          type='text'
          name='contactPerson'
          placeholder='Enter Contact Person'
          value={formik.values.contactPerson}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.contactPerson}
          touched={formik.touched.contactPerson}
        />
        <TextInput
          label='Jersy Number'
          type='text'
          name='jerseyNumber'
          placeholder='Enter Jersy Number'
          value={formik.values.jerseyNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.jerseyNumber}
          touched={formik.touched.jerseyNumber}
        />
      </div>

      <div className='row mb-8'>
        <div className='col-md-6'>
          <label className='form-label'>Date of Birth</label>
          <div>
            <DatePicker
              selected={formik.values.dob}
              onChange={(date) => formik.setFieldValue("dob", date)}
              onBlur={formik.handleBlur}
              dateFormat='dd/MM/yyyy'
              className='form-control'
            />
            {formik.errors.dob && formik.touched.dob && (
              <div style={{ color: "red" }}>{formik.errors.dob}</div>
            )}
          </div>
        </div>
      </div>

      <div className='mb-10'>
        <label className='form-label'>Home Address</label>
        <textarea
          name='homeAddress'
          className='form-control'
          placeholder='Provide home address here...'
          rows={5}
          value={formik.values.homeAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.homeAddress && formik.errors.homeAddress ? (
          <div className='text-danger'>{formik.errors.homeAddress}</div>
        ) : null}
      </div>
    </form>
  );
});

export default Form;
