import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget10 } from "../../../_metronic/partials/widgets";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row gy-5 gx-xl-12">
        <div className="col-xl-12">
          <TablesWidget10 className="card-xxl-stretch mb-5 mb-xl-12" />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
