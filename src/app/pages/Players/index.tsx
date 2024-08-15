import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { RootState } from "../../../store";
import { useEffect } from "react";

const Players = () => {
  const dispatch = useDispatch();

  const { players, error, loading } = useSelector(
    (state: RootState) => state.players
  );

  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.GET_PLAYERS });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDeleteRecord = (id: string | number) => {
    dispatch({ type: SAGA_ACTIONS.DELETE_PLAYER, payload: id });
  };

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Players</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="All Players"
          tableData={players}
          modalTitle="Add Player"
          Form={Form}
          onDelete={handleDeleteRecord}
        />
      </Content>
    </>
  );
};

export default Players;
