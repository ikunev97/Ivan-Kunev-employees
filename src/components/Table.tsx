export const Table = ({ header, data }: any) => {
  return (
    <table id="table">
      <thead>
        <tr key={"header"}>
          {header.map((key: any, index: number) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            {Object.values(item).map((val: any, index) => (
              <td key={index}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
