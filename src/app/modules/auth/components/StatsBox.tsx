import { currencyFormatter } from "../../../utils/helpers";

type StatsBoxProps = {
  value: number | string;
  title: string;
  color: string;
  isCurrency?: boolean;
};

const StatsBox: React.FC<StatsBoxProps> = ({
  value,
  title,
  color,
  isCurrency = true,
}) => {
  return (
    <div className="col-md-4">
      <div
        className="border rounded p-4 text-center"
        style={{ backgroundColor: color }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {isCurrency ? currencyFormatter(Number(value)) : value}
        </div>
        <div style={{ fontSize: "14px", marginTop: "5px" }}>{title}</div>
      </div>
    </div>
  );
};

export default StatsBox;
