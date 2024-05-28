import { DataType } from "../../model/types";
import DataItem from "../DataItem/DataItem";

type Props = {
  data: DataType[];
  onDelete(id: number | string): void;
};

const DataList = ({ data, onDelete }: Props) => {
  return (
    <>
      {data.map((item, index) => (
        <DataItem
          key={`${item.id}` + `${index}`}
          data={item}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default DataList;
