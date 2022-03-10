import { Table } from "antd";
export let AntTable = (props) => {
  let renderFun = (point) => {
    return (i, el) => {
      return (
        <select
          value={el[point]}
          onChange={(e) => {
            props.changeOrderPointAC(el, el.key, point, e.target.value);
          }}
        >
          {props.markers.map((e) => {
            return (
              <option value={e.name} key={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      );
    };
  };
  const rowSelection = {
    type: "radio",
    checkStrictly: false,
    onChange: (i, record) => {
      props.clickOnRowAC(record);
    },
  };
  let columns = [
    { title: "Имя", dataIndex: "name" },
    { title: "Описание", dataIndex: "describe" },
    {
      title: "Время",
      dataIndex: "time",
    },
    {
      title: "Начало",
      dataIndex: "start",
      render: renderFun("start"),
    },
    { title: "Конец", dataIndex: "end", render: renderFun("end") },
  ];
  return (
    <Table
      rowSelection={rowSelection}
      tableLayout={"fixed"}
      scroll={{ x: true }}
      pagination={false}
      columns={columns}
      dataSource={props.orders}
    />
  );
};
