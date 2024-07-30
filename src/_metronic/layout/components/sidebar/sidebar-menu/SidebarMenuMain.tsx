import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/ependitures"
        icon="abstract-28"
        title="Expenditures"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/players"
        icon="abstract-28"
        title="Players"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/users"
        icon="abstract-28"
        title="Users"
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };
