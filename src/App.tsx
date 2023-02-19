import { useCallback, useState } from "react";
import "./App.css";
import { Uploader } from "./components/Uploader";
import { Table } from "./components/Table";
import { Loading } from "./components/Loading";
import dayjs from "dayjs";

type TableDataType = {
  EmpID: string;
  ProjectID: string;
  DateFrom: string;
  DateTo: string | null;
};

type csvHeadersType = csvHeadersEnum;

enum csvHeadersEnum {
  EmpID = "EmpID",
  ProjectID = "ProjectID",
  DateFrom = "DateFrom",
  DateTo = "DateTo",
}

const App = () => {
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<TableDataType[]>([]);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileReader = new FileReader();

  const handleChange = (e: React.SyntheticEvent) => {
    const element = e.target as HTMLInputElement;
    if (!element.files?.length) {
      return;
    }
    setFile(element.files[0]);
    setFileName(element.files[0].name);
  };

  const normalizeData = (key: csvHeadersType, value: string) => {
    if (key === csvHeadersEnum.DateTo || key === csvHeadersEnum.DateFrom) {
      value = value
        ? dayjs(value).format("YYYY-MM-DD")
        : dayjs(new Date()).format("YYYY-MM-DD");
    }
    return value;
  };

  const csvFileToArray = useCallback((result: string) => {
    const csvHeader = result
      .slice(0, result.indexOf("\n"))
      .replace("\r", "")
      .split(",") as csvHeadersType[];

    const csvRows = result.slice(result.indexOf("\n") + 1).split("\n");

    const data: TableDataType[] = csvRows.map((row: string) => {
      const values = row.split(",");
      const obj = csvHeader.reduce<TableDataType>(
        (object: TableDataType, header: csvHeadersType, index) => {
          object[header] = normalizeData(header, values[index]);
          return object;
        },
        {} as TableDataType
      );
      return obj;
    });

    setData(data);
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (file) {
      fileReader.onload = (event) => {
        setIsLoading(false);
        const result = event?.target?.result as string;
        csvFileToArray(result);
      };
      fileReader.readAsText(file);
    }
  };

  const header = Object.keys(Object.assign({}, ...data));

  if (isLoading) return <Loading />;
  return (
    <>
      <Uploader
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fileName={fileName}
      />
      <Table header={header} data={data} />
    </>
  );
};

export default App;
