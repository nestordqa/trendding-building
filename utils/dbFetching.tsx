import axios from 'axios';

export const getTransactions = async () => {
    const response = await axios.get("/api/transaction");
    const transaction = await response.data;
  
    if (!transaction) {
      throw new Error("Data not found");
    }
    return transaction;
  };