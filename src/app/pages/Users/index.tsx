import { useDispatch, useSelector } from "react-redux";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { PageTitle } from "../../../_metronic/layout/core";
import { TablesWidget13 } from "../../../_metronic/partials/widgets";
import Form from "./Form";
import { RootState } from "../../../store";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { useEffect } from "react";
import Loader from "../../modules/auth/components/Loader";

const Users = () => {
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch({
      type: SAGA_ACTIONS.FETCH_USERS,
    });
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <ToolbarWrapper />
      <PageTitle>Users</PageTitle>
      <Content>
        {error && (
          <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
            <div className="d-flex flex-column">
              <span>{error}</span>
            </div>
          </div>
        )}

        <TablesWidget13
          className="card-xxl-stretch mb-5 mb-xl-12"
          mainTitle="All Users"
          tableData={users}
          modalTitle="Add User"
          Form={Form}
          onDelete={() => {}}
        />
      </Content>
    </>
  );
};

export default Users;
