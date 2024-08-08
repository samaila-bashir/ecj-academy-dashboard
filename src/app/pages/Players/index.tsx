import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";

const Players = () => {
  const playersData = [
    {
      id: 1,
      firstName: "Sunday",
      lastName: "Ade",
      stateOfOrigin: "Adamawa",
      email: "sunday@gmail.com",
      phoneNumber: "08020202020",
      dob: "01/08/1991",
      homeAddress: "Home address...",
      date: "01/02/2024",
    },
    {
      id: 2,
      firstName: "Mike",
      lastName: "John",
      stateOfOrigin: "Kogi",
      email: "mike@gmail.com",
      phoneNumber: "08020202020",
      dob: "12/12/1992",
      homeAddress: "Home address...",
      date: "01/02/2024",
    },
  ];

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Players</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="All Players"
          tableData={playersData}
          modalTitle="Add Player"
          Form={Form}
        />
      </Content>
    </>
  );
};

export default Players;
