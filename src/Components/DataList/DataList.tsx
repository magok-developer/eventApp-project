import styled from "styled-components";
import { DataType } from "../../model/types";
import DataItem from "../DataItem/DataItem";

type Props = {
  data: DataType[];
  onDelete(id: number): void;
};

const DataList = ({ data, onDelete }: Props) => {
  return (
    <Container>
      {data.map((item, index) => (
        <DataItem
          key={`${item.id}_${index}`}
          data={item}
          onDelete={() => {
            onDelete(item.id);
          }}
        />
      ))}
    </Container>
  );
};

export default DataList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 20px;
`;
