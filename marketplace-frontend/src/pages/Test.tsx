import userApiModules from "@/api/userApiModules";

const Test = () => {
  return (
    <div>
      <h1>Test file</h1>
      <button
        onClick={() => {
          userApiModules.getUser().then((data) => console.log(data));
        }}
      >
        Get user
      </button>
    </div>
  );
};

export default Test;
