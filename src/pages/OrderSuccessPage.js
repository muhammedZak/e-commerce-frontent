import { useParams } from 'react-router-dom';

const OrderSuccessPage = () => {
    const { id: orderID } = useParams();
    
    

  return <div>OrderSuccessPage</div>;
};

export default OrderSuccessPage;
