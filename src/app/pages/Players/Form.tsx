import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import Swal from "sweetalert2";
import { states } from "../../utils/data";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  stateOfOrigin: Yup.string().required("State of origin is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  dob: Yup.string().required("Date of birth is required"),
  homeAddress: Yup.string().required("Home address is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  stateOfOrigin: "",
  phoneNumber: "",
  dob: "",
  homeAddress: "",
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  stateOfOrigin: string;
  phoneNumber: string;
  dob: string;
  homeAddress: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  stateOfOrigin: string;
  phoneNumber: string;
  dob: string;
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

        Swal.fire({
          title: "Success!",
          text: "Player has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_PLAYER,
          payload: values,
        });

        Swal.fire({
          title: "Success!",
          text: "Player has been added successfully.",
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
      <div className="row mb-8">
        <TextInput
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
        <TextInput
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
      </div>

      <div className="row mb-8">
        <div className="col-md-6">
          {/* TODO: Use React Select for this. Check docs */}
          <label className="form-label">State of Origin</label>
          <select
            name="stateOfOrigin"
            className="form-select"
            aria-label="Select State"
            value={formik.values.stateOfOrigin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">--- Select State ---</option>
            {states.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
          {formik.touched.stateOfOrigin && formik.errors.stateOfOrigin ? (
            <div className="text-danger">{formik.errors.stateOfOrigin}</div>
          ) : null}
        </div>
        <TextInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>

      <div className="row mb-8">
        <TextInput
          label="Phone Number"
          type="text"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
        />
        {/* TODO: Use date picker for DOB */}
        <TextInput
          label="Date of Birth"
          type="text"
          name="dob"
          placeholder="Enter Date of Birth"
          value={formik.values.dob}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.dob}
          touched={formik.touched.dob}
        />
      </div>

      <div className="mb-10">
        <label className="form-label">Home Address</label>
        <textarea
          name="homeAddress"
          className="form-control"
          placeholder="Provide home address here..."
          rows={5}
          value={formik.values.homeAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.homeAddress && formik.errors.homeAddress ? (
          <div className="text-danger">{formik.errors.homeAddress}</div>
        ) : null}
      </div>
    </form>
  );
});

export default Form;
