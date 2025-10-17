import { List, ProcessTracks } from "../components";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-list">
        {/* <List /> */}
        <ProcessTracks />
      </div>
    </div>
  );
};

export default Dashboard;
