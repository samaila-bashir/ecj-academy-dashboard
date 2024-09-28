import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { RootState } from "../../../store";
import { useEffect } from "react";
import Loader from "../../modules/auth/components/Loader";

const Investments = () => {
  const dispatch = useDispatch();

  const { investments, error, loading } = useSelector(
    (state: RootState) => state.investments
  );

  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.GET_INVESTMENTS });
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const handleDeleteRecord = (id: string | number) => {
    dispatch({ type: SAGA_ACTIONS.DELETE_INVESTMENT, payload: id });
  };

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Investments</PageTitle>
      <Content>
        <TablesWidget13
          className='card-xxl-stretch mb-5 mb-xl-12'
          mainTitle='All Investments'
          tableData={investments}
          modalTitle='Investment'
          Form={Form}
          onDelete={handleDeleteRecord}
        />
      </Content>
    </>
  );
};

export default Investments;
