import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      const { firstName, lastName, email, password } = values;

      dispatch({
        type: SAGA_ACTIONS.ADD_USER,
        payload: { firstName, lastName, email, password },
      });

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
          columnMd="col-md-12"
        />
      </div>

      <div className="row mb-8">
        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />
      </div>
    </form>
  );
});

export default Form;
