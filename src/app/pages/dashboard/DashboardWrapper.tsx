import { FC, useEffect, useMemo } from "react";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  aggregateExpenditureDataByCategory,
  // processSalaryData,
  sumAmounts,
} from "../../utils/helpers";
import PieChart from "../../components/PieChart";
import { SAGA_ACTIONS } from "../../../store/sagas/actions";
import { shallowEqual } from "react-intl/src/utils";
// import ComposedChart from "../../components/ComposedChart";
import StatsBox from "../../modules/auth/components/StatsBox";

const DashboardWrapper: FC = () => {
  const dispatch = useDispatch();
  const { expenditures, salaries, players, investments, users } = useSelector(
    (state: RootState) => ({
      expenditures: state.expense.expenditures,
      salaries: state.playersSalaries.playersSalaries,
      players: state.players.players,
      investments: state.investments.investments,
      users: state.users.users,
    }),
    shallowEqual
  );

  const expendituresData = useMemo(
    () => aggregateExpenditureDataByCategory(expenditures || []),
    [expenditures]
  );
  // const salariesData = useMemo(
  //   () => processSalaryData(salaries || []),
  //   [salaries]
  // );

  const totalSalaries = sumAmounts(salaries || []);
  const totalExpenses = sumAmounts(expenditures || []);
  const totalPlayers = players?.length || 0;
  const totalInvestments = sumAmounts(investments || []);

  const investmentsData = useMemo(() => {
    return (
      investments?.map((inv) => {
        const investor = users?.find((user) => user.id === inv.userId);
        return {
          category: investor
            ? `${investor.firstName} ${investor.lastName}`
            : "Unknown",
          value: +inv.amount,
        };
      }) || []
    );
  }, [investments, users]);

  useEffect(() => {
    dispatch({
      type: SAGA_ACTIONS.GET_EXPENDITURES,
    });

    dispatch({
      type: SAGA_ACTIONS.GET_PLAYER_SALARIES,
    });

    dispatch({
      type: SAGA_ACTIONS.GET_INVESTMENTS,
    });
  }, [dispatch]);

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className='row gy-5 gx-xl-12'>
          <div className='col-xl-6'>
            <PieChart title='Expenditures' data={expendituresData} />
          </div>
          {/* <div className='col-xl-4'>
            <ComposedChart title='Salaries' data={salariesData} />
          </div> */}
          <div className='col-xl-6'>
            <PieChart title='Investments' data={investmentsData} />
          </div>
        </div>
        <div className='row gy-5 gx-xl-12 mt-10'>
          <StatsBox
            value={totalExpenses}
            title='Total Expenses Made'
            color='#d4edda'
            isCurrency={true}
          />
          <StatsBox
            value={totalPlayers}
            title='Registered Players'
            color='#d1ecf1'
            isCurrency={false}
          />
          <StatsBox
            value={totalSalaries}
            title='Total Salaries Paid'
            color='#b3b0e6'
            isCurrency={true}
          />
          <StatsBox
            value={totalInvestments}
            title='Total Investments'
            color='#ffeeba'
            isCurrency={true}
          />
        </div>
      </Content>
    </>
  );
};

export { DashboardWrapper };
