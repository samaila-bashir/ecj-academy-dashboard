import { useAuth } from "../../../../app/modules/auth";

const SidebarFooter = () => {
  const { logout } = useAuth();

  return (
    <div
      className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
      id="kt_app_sidebar_footer"
    >
      <a
        className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-trigger="hover"
        onClick={logout}
      >
        <span className="btn-label">Sign Out</span>
      </a>
    </div>
  );
};

export { SidebarFooter };
