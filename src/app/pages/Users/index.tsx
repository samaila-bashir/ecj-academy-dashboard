import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";

const Users = () => {
  const usersData = [
    {
      id: 1,
      firstName: "Dominic",
      lastName: "Chatto",
      email: "dominic@gmail.com",
    },
    {
      id: 2,
      firstName: "Leke",
      lastName: "James",
      email: "leke@gmail.com",
    },
  ];

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Users</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="All Users"
          tableData={usersData}
          modalTitle="Add User"
          Form={Form}
        />
      </Content>
    </>
  );
};

export default Users;
