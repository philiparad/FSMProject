export const createStyles = () => `
  .currentState {
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 10px;
    margin-left: 5px;
  }

  .fetchButton, .resetButton, .tryAgainButton {
    background-color: #1890ff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 5px;
  }

  .tryAgainButton {
    background-color: #ff4d4f;
  }

  .countryTable {
    width: 500px;
    border-collapse: collapse;
    margin-left: 5px;
  }

  .countryTable th, .countryTable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .countryTable th {
    background-color: #f2f2f2;
  }

  .countryTable img {
    vertical-align: middle;
  }

  .dataLoading, .dataIdle {
    width: 500px;
    height: 509px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0; /* Grey background color */
  }

  .spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: spin 1s linear infinite;
  }


  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
