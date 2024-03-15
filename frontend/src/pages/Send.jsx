import SendMoney from "../components/SendMoney";
import axios from 'axios';

const Send = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  const token = localStorage.getItem('token');
  const handleTransfer = async (amount) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
        to: id,
        amount: amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // Handle response data accordingly
    } catch (error) {
      console.error('Error transferring money:', error);
    }
  };

  return <SendMoney name={name} handleTransfer={handleTransfer} />;
};

export default Send;
