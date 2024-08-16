import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAGA_ACTIONS } from "../../../../store/sagas/actions";

const SidebarFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
      id="kt_app_sidebar_footer"
    >
      <a
        className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-trigger="hover"
        onClick={() =>
          dispatch({ type: SAGA_ACTIONS.LOGOUT, payload: { navigate } })
        }
      >
        <span className="btn-label">Sign Out</span>
      </a>
    </div>
  );
};

export { SidebarFooter };
