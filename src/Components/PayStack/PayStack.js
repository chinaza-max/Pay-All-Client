import React,{useEffect} from 'react'
import { usePaystackPayment } from 'react-paystack';



const onSuccess = (reference) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log('closed')
  }

export default function PayStack(props) {
    const initializePayment = usePaystackPayment(props.config);

    useEffect(() => {
        initializePayment(onSuccess, onClose);
    }, [initializePayment]);

    
    return (
      <div>
      </div>
    );
}
