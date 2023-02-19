export const Uploader = ({ handleChange, handleSubmit, fileName }: any) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>CSV IMPORT</h1>
      <form className="form">
        <label className="csvFileInput" htmlFor="csvFileInput">
          Choose file
        </label>
        {fileName && <p className="fileName">{fileName}</p>}
        <input
          type={"file"}
          id="csvFileInput"
          accept={".csv"}
          onChange={handleChange}
        />
        {fileName && (
          <button className="importBtn" onClick={(e) => handleSubmit(e)}>
            Import file
          </button>
        )}
      </form>
    </div>
  );
};
