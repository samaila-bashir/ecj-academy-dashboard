import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";

const Expenditures = () => {
  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Expenditures</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="Recent Expenditures"
        />
      </Content>
    </>
  );
};
export default Expenditures;
