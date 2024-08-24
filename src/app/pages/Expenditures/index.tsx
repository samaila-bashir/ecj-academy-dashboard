import { useEffect } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { RootState } from "../../../store";
import Loader from "../../modules/auth/components/Loader";

const Expenditures = () => {
  const dispatch = useDispatch();

  const { expenditures, error, loading } = useSelector(
    (state: RootState) => state.expense
  );

  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.GET_EXPENDITURES });
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const handleDeleteRecord = (id: string | number) => {
    dispatch({ type: SAGA_ACTIONS.DELETE_EXPENDITURE, payload: id });
  };

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Expenditures</PageTitle>
      <Content>
        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="Recent Expenditures"
          tableData={expenditures}
          modalTitle="Expenditure"
          Form={Form}
          onDelete={handleDeleteRecord}
        />
      </Content>
    </>
  );
};

export default Expenditures;
