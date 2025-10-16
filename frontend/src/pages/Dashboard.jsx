import { List } from "../components";
import sampleData from "../data/sample_data.json";

const Dashboard = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sonique Matches</h1>
      <List songIDs={sampleData.songIds} />;
    </>
  );
};

export default Dashboard;
