import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "../../../../store/sagas/actions";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state: RootState) => state.authentication);

  return (
    <form className='form w-100' noValidate id='kt_login_signin_form'>
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Using your social accounts
        </div>
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}
      <div className='row  mb-9'>
        {/* begin::Col */}
        <div className='col-md-12'>
          {/* begin::Google link */}
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
            onClick={() => {
              dispatch({
                type: SAGA_ACTIONS.GOOGLE_LOGIN,
                payload: { navigate },
              });
            }}
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl("media/svg/brand-logos/google-icon.svg")}
              className='h-15px me-3'
            />
            Sign in with Google
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}
      </div>
      {/* end::Login options */}

      {error && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{error}</div>
        </div>
      )}
    </form>
  );
}
