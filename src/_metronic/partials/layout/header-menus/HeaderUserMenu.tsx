import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../app/modules/auth";
import { Languages } from "./Languages";
import { useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../../store/sagas/actions";

const HeaderUserMenu: FC = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            {/* <img alt="Logo" src="https://placehold.co/300x300" /> */}
            <img alt="Logo" src="/media/avatars/dominic.jpg" />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.first_name} {currentUser?.first_name}
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to="#" className="menu-link px-5">
          My Profile
        </Link>
      </div>

      <div className="menu-item px-5">
        <Link to="/expense-categories" className="menu-link px-5">
          Expense Categories
        </Link>
      </div>

      <div className="separator my-2"></div>

      <Languages />

      <div className="menu-item px-5">
        <a
          onClick={() =>
            dispatch({ type: SAGA_ACTIONS.LOGOUT, payload: { navigate } })
          }
          className="menu-link px-5"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
