import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/transactions');
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, { ...newTransaction, id: Date.now() }];
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
  };

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default App;