import { forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { RootState } from "../../../store";

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_green.css";

const validationSchema = Yup.object({
  playerId: Yup.string().required("Player Name is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than zero"),
});

const initialValues = {
  playerId: "",
  amount: 0,
};

interface FormValues {
  playerId: string;
  amount: number;
}

interface FormProps {
  initialData?: FormValues;
}

const Form = forwardRef(({ initialData }: FormProps, ref) => {
  const dispatch = useDispatch();
  //   const [datePaid, setDatePaid] = useState<Date | null>(new Date());
  const { players } = useSelector((state: RootState) => state.players);

  const formik = useFormik<FormValues>({
    initialValues: initialData || initialValues,
    validationSchema,
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      if (initialData) {
        dispatch({
          type: SAGA_ACTIONS.EDIT_SALARY,
          payload: { ...initialData, ...values },
        });
      } else {
        dispatch({
          type: SAGA_ACTIONS.ADD_SALARY,
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
      <div className="row mb-8">
        <div className="col-md-6">
          {/* TODO: Use React searchable Select for this. Check docs */}
          <label className="form-label">Player</label>
          <select
            name="playerId"
            className="form-select"
            aria-label="Select Player"
            value={formik.values.playerId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">--- Select State ---</option>
            {players.map((player) => (
              <option value={player.id} key={player.id}>
                {player.firstName + " " + player.firstName}
              </option>
            ))}
          </select>
          {formik.touched.playerId && formik.errors.playerId ? (
            <div className="text-danger">{formik.errors.playerId}</div>
          ) : null}
        </div>

        <TextInput
          label="Amount"
          type="text"
          name="amount"
          placeholder="Enter amount"
          value={String(formik.values.amount)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.amount}
          touched={formik.touched.amount}
        />

        {/* TODO: Implement date picker here. Note, this is optional */}

        {/* <Flatpickr
          data-enable-time
          value={datePaid || new Date()}
          onChange={([date]) => {
            setDatePaid(date || null);
          }}
          className="form-control"
          placeholder="Pick date"
        /> */}
      </div>
    </form>
  );
});

export default Form;
