import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='home'
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/ependitures'
        icon='receipt-square'
        title='Expenditures'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/players'
        icon='people'
        title='Players'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/players-salaries'
        icon='wallet'
        title='Players Salaries'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/users'
        icon='profile-user'
        title='Users'
        fontIcon='bi-layers'
      />
    </>
  );
};

export { SidebarMenuMain };
