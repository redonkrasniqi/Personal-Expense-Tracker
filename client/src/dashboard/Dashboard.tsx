import { Button } from 'antd';
import NewTransaction from './transactions/NewTransaction';
import '../App.css';
import { useState } from 'react';

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const handleNewTransaction = () => {
    console.log("This is the new transaction")
  }

  return (
    <div className="App">
      <Button onClick={() => setModalVisible(true)}>
        <p>Add Expense</p>
      </Button>
      <NewTransaction visible={modalVisible} onClose={handleModalClose} />
      <h1>Welcome to the Dashboard</h1>
      <p>This dashboard is designed to help you track your personal expenses efficiently. By using this tool, you can gain insights into your spending habits and make informed financial decisions.</p>
      <h2>Features</h2>
      <p>The dashboard offers a variety of features to help you manage your finances:</p>
      <ul>
        <li>Expense Tracking: Record and categorize your expenses to see where your money is going.</li>
        <li>Budgeting: Set monthly budgets and track your progress to ensure you stay within your limits.</li>
        <li>Reports: Generate detailed reports to analyze your spending patterns over time.</li>
        <li>Notifications: Receive alerts for upcoming bills and budget limits.</li>
      </ul>
      <h2>Getting Started</h2>
      <p>To get started, simply add your expenses using the form provided. You can categorize each expense to make it easier to track and analyze later. The dashboard will automatically update to reflect your latest entries.</p>
      <h2>Conclusion</h2>
      <p>By using this personal expense tracker, you can take control of your finances and work towards your financial goals. Whether you are saving for a big purchase or just trying to manage your day-to-day expenses, this tool can help you stay on track.</p>
    </div>
  );
}

export default Dashboard;
