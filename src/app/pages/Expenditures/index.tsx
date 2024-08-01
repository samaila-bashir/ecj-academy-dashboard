import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";

const Expenditures = () => {
  const expenseData = [
    {
      id: 1,
      category: "Category 1",
      amount: "200,000",
      description: "This is a sample descript",
    },
    {
      id: 2,
      category: "Category 2",
      amount: "80,000",
      description: "This is a sample descript",
    },
  ];

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Expenditures</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="Recent Expenditures"
          tableData={expenseData}
          modalTitle="Add Expenditure"
          Form={Form}
        />
      </Content>
    </>
  );
};

export default Expenditures;
