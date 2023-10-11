import React,{useEffect,useState, useRef } from 'react'
import Loader1 from "../LoaderVerification/LoaderVerification"
import axios from   'axios';
import "./Form.css"
import { usePaystackPayment } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import img from '../../Image/logo2.png';
import Swal from 'sweetalert2'

const domain="http://localhost:5000"


export default function Form() {

  const [service,setMyService]=useState([]);
  const [dataService,setDataService]=useState([]);
  const [dataServicePlan,setDataServicePlan]=useState([]);
  const [dataServicePlanInitial,setDataServicePlanInitial]=useState([]);
  const [cableServicePlanInitial,setCableServicePlanInitial]=useState([]);
  const [airTimeNetwork,setAirTimeNetwork]=useState([]);
  const [cableService,setcableService]=useState([]);
  const [item_codeAirtime,setItem_codeAirtime]=useState('AT099');
  const [dataNetworkCode,setDataNetworkCode]=useState("mtn_sme_data");
  const [networkPlanId,setNetworkPlanId]=useState();
  const [dataNetworkCodeAmount,setDataNetworkCodeAmount]=useState("M500MBS");
  const [priceOfData,setPriceOfData]=useState(0);
  const [userOfEmail,setUserOfEmail]=useState("");
  const [flutterwavePublicKey,setFlutterwavePublicKey]=useState("");
  const [paystackPublicKey,setPaystackPublicKey]=useState("");
  const [token,setToken]=useState("");
  const [isClick,setIsClick]=useState(false);

  const [networkToRecharge,setnetworkToRecharge]=useState('MTN');
  const [networkForData,setNetworkForData]=useState('mtn');
  const [networkForDataType,setNetworkForDataType]=useState("MTN (SME) DATA");

  const [selectedService,setSelectedService]=useState("data");
  const [load,setLoad]=useState(false);
  const [dataServiceStatus,setDataServiceStatus]=useState(true);
  const [airTimeServiceStatus,setairTimeServiceStatus]=useState(false);
  const [electricityServiceStatus,setElectricityServiceStatus]=useState(false);
  const [cableSubServiceStatus,setCableSubServiceStatus]=useState(false);
  const [cableBundle,setcableBundle]=useState([]);
  const [selectedCableBundle,setSelectedCableBundle]=useState();
  const [cablePrice,setCablePrice]=useState(0);
  const [cableID,setCableID]=useState(1);
  const [discoProvider,setDiscoProvider]=useState([]);
  const [selectedDiscoProvider,setSelectedDiscoProvider]=useState();
  const [configData,setConfigData]=useState({});
  
  const [serviceData,setServiceData]=useState({val1:'', val2:'', val3:'',val4:'',val5:'',val6:'',val7:''});

  const handleFlutterPayment = useFlutterwave(configData);

  function handleChange1(e){

    if(e.target.value==="data"){
      setairTimeServiceStatus(false)
      setDataServiceStatus(true)
      setElectricityServiceStatus(false)
      setCableSubServiceStatus(false)
   
      setSelectedService("data")
      //for resetting select option when user selects different service
      setDataServicePlan(dataServicePlanInitial)
    }
    else if(e.target.value==="airtime"){
      setairTimeServiceStatus(true)
      setDataServiceStatus(false)
      setElectricityServiceStatus(false)
      setCableSubServiceStatus(false)
     
      setSelectedService("airtime")
    }
    else if(e.target.value==="cable subscription"){
      setairTimeServiceStatus(false)
      setDataServiceStatus(false)
      setElectricityServiceStatus(false)
      setCableSubServiceStatus(true)
    
      setSelectedService("cable subscription")
      //for resetting select option when user selects different service
      setcableBundle(cableServicePlanInitial)
    }
    else if(e.target.value==="electricity"){
      setairTimeServiceStatus(false)
      setDataServiceStatus(false)
      setElectricityServiceStatus(true)
      setCableSubServiceStatus(false)
      setSelectedService("electricity")
      setTimeout(() => {
        document.querySelector("#displayDiscoProvider").selectedIndex = 0;
      }, 300);
    }
    
    if(document.querySelector("#alert")){
      document.querySelector("#alert").textContent=""
      setLoad(false)
    }
    if(document.querySelector("#confirmation")){
      document.querySelector("#confirmation").textContent=""
    }
    
  }

  function handleChange2(e){
    document.querySelector("#displaydataServicePlan").selectedIndex = 0;
    setDataNetworkCode(e.target.selectedOptions[0].getAttribute('datacode'))
    setNetworkForDataType(e.target.selectedOptions[0].getAttribute('datatype'))
    if(e.target.value==="GLO"){
      handleApiCall("GLO", "Gifting")
      setNetworkForData("glo")
    }
    else if(e.target.value==="MTN_SME"){
      handleApiCall("MTN", "SME")
      setNetworkForData("mtn")

    }
    else if(e.target.value==="9MOBILE"){
      handleApiCall("9mobile", "Gifting")
      setNetworkForData("9mobile")


    }
    else if(e.target.value==="MTN_CG"){
      handleApiCall2("MTN", "Gifting")
      setNetworkForData("mtn")


    }
    else if(e.target.value==="AIRTEL"){
      handleApiCall("AIRTEL", "Gifting")
      setNetworkForData("airtel")


    }

    if(  document.querySelector("#alert")){
      document.querySelector("#alert").textContent=""
      setLoad(false)
    }
   
    
  }

  function handleChange3(e){

    setItem_codeAirtime(e.target.selectedOptions[0].getAttribute('item_code'))
    setnetworkToRecharge(e.target.selectedOptions[0].getAttribute('networktorecharge'))
  }
  
  function handleChange4(e){
    setDataNetworkCodeAmount(e.target.value)
    setPriceOfData(e.target.selectedOptions[0].getAttribute('price'))
    setNetworkPlanId(e.target.selectedOptions[0].getAttribute('datacode2'))
  }

 function handleChange5(e){
  setUserOfEmail(e.target.value)

 }

 function handleChange6(e){
  document.querySelector("#displayCableBundle").selectedIndex = 0;
    setcableBundle([{
           package_code: 'chinese',
           package_name: 'loading',
           price: 'loading'
         }])

    setCableID(e.target.value)
    handleApiCall3(e.target.selectedOptions[0].getAttribute('name'))
 }
 function handleChange7(e){
  setCablePrice(e.target.selectedOptions[0].getAttribute('price'))
  setSelectedCableBundle(e.target.value)
 }
function handleChange8(e){
  setSelectedDiscoProvider(e.target.value)
  console.log(e.target.value)
}
  

function handleApiCall3(name){
  
  let csrftoken=token
  axios.get(`${domain}/request/api2/myCableBundle2`,{
    params: {
      csrftoken,
      cableType:name
    },
    withCredentials: true
  }).then((res)=>{ 
      const payLoad=res.data.express.payLoad
      setcableBundle(payLoad)

  })
  .catch((error)=>{
    console.log(error.response.data.express)
  })
}



 function PaymentConfig(val1, val2, val3,val4,val5,val6,val7){
  setServiceData({val1, val2, val3,val4,val5,val6,val7})
  const config = {
    public_key:flutterwavePublicKey,
    tx_ref: Date.now(),
    amount: val6,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userOfEmail,
      phone_number:val1,
      name: '',
    },
    customizations: {
      title: 'my Payment Title',
      description:val7,
      logo: img,
    },
  };
  
  const config2 = {
    reference: (new Date()).getTime().toString(),
    email: userOfEmail,
    amount: val6, 
    publicKey: paystackPublicKey,
  };

  //console.log(config2)
  setIsClick(true)
  setConfigData(config2)

  setTimeout(() => {
    setIsClick(false)
  }, 1000);


  //initializePayment(onSuccess, onClose)

  //FlutterwaveCheckout(config);
  
  //setConfigData(config)


  /*
  document.getElementById("flutterWaveButton").click();

  setTimeout(() => {
    document.getElementById("flutterWaveButton").click();
  }, 200);
  paystackButton
  */

 }

  function payNow(e){
    e.preventDefault()
    if(selectedService==="airtime"){
      startProcessingAirTime()
    }
    else if(selectedService==="data"){
      startProcessingData()
    } 
    else if(selectedService==="cable subscription"){
      startProcessingcablesubscription()
    } 
    else if(selectedService==="electricity"){
      startProcessingDisco()
    } 

   
  }


  function startProcessingDisco(){
    let val1=document.getElementById("phone").value
    let val2=selectedDiscoProvider
    let val3=userOfEmail
    let val4=document.getElementById("MeterNo").value
    let val5=''
    let val6=document.getElementById("DiscoPrice").value
    let val7=`purchase of meter unit (${val2}-${val6})`
    setLoad(true)
    console.log(val1, val2, val3,val4,val5,val6,val7)

    validateMeterNo(val1, val2, val3,val4,val5,val6,val7)

  }


function validateMeterNo(val1, val2, val3,val4,val5,val6,val7){


  console.log(val1, val2, val3,val4,val5,val6,val7)
  let csrftoken=token
  axios.get(`${domain}/request/api2/validateMeterNo2`,{
    params: {
      csrftoken,
      disco:val2,
      meternumber:val4,
    },
    withCredentials: true
  }).then((res)=>{ 

    setTimeout(() => {
      document.querySelector("#confirmation").textContent=res.data.express.payLoad
    }, 500);

    checkBalanceApi3(val1, val2, val3,val4,res.data.express.payLoad,val6,val7)
  })
  .catch((error)=>{
    setLoad(false)
    setTimeout(() => {
      document.querySelector("#confirmation").textContent=''
      document.querySelector("#alert").textContent=error.response.data.express.payLoad
    }, 500);
  })
}

function startProcessingcablesubscription(){
  let val1=document.getElementById("phone").value
  let val2=selectedCableBundle
  let val3=selectedService
  let val4=document.getElementById("cardNo").value
  let val5=cableID
  let val6=cablePrice
  let val7=`purchase of cable subscription (${val2}-${val6})`
  setLoad(true)
  validatecard(val1, val2, val3,val4,val5,val6,val7)
}

function validatecard(val1, val2, val3,val4,val5,val6,val7){

  let csrftoken=token
  axios.get(`${domain}/request/api2/verifyCableNo2`,{
    params: {
      csrftoken,
      cabletype:val5,
      cableNo:val4,
    },
    withCredentials: true
  }).then((res)=>{ 

    setTimeout(() => {
      document.querySelector("#confirmation").textContent=res.data.express.payLoad
    }, 500);

    checkBalanceApi4(val1, val2, val3,val4,val5,val6,val7)
  })
  .catch((error)=>{
    setLoad(false)
    setTimeout(() => {
      document.querySelector("#confirmation").textContent=''
      document.querySelector("#alert").textContent=error.response.data.express.payLoad
    }, 500);
  })
}

function checkBalanceApi4(val1, val2, val3,val4,val5,val6,val7){
  const fetchData = async () => {
    let csrftoken=token
    
    axios.get(`${domain}/request/api2/verifyMytransaction2`,{
      params: {
        csrftoken,
        amount:val6
      },
      withCredentials: true
    }).then((res)=>{ 
      setLoad(false)
      PaymentConfig(val1, val2, val3,val4,val5,val6,val7)

    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();
}

function buyCableSub(val1, val2, val3,val4,val5,val6,val7){
  const fetchData = async () => {
    let csrftoken=token
    console.log(val1, val2, val3,val4,val5,val6,val7)
    axios.get(`${domain}/request/api2/buyCableSub2`,{
      params: {
        csrftoken,
        cabletv:val5,
        smartcard_iuc:val4,
        package_code:val2
      },
      withCredentials: true
    }).then((res)=>{ 

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'your request was suucessful',
        showConfirmButton: false,
        timer: 1500
      })

    })
    .catch((error)=>{
     
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();
}
function checkBalanceApi3(val1, val2, val3,val4,val5,val6,val7){
  const fetchData = async () => {
    let csrftoken=token
    
    axios.get(`${domain}/request/api2/verifyMytransaction2`,{
      params: {
        csrftoken,
        amount:val6
      },
      withCredentials: true
    }).then((res)=>{ 
      PaymentConfig(val1, val2, val3,val4,val5,val6,val7)

    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();
}

function startProcessingData(){
  let val1=document.getElementById("phone").value
  let val2=dataNetworkCode
  let val3=dataNetworkCodeAmount
  let val4=networkForData
  let val5=networkForDataType
  let val6=priceOfData
  let val7=`purchase of data (${dataNetworkCodeAmount}-${networkForData})`
  
  setLoad(true)
  validatenumberforData(val1, val2, val3,val4,val5,val6,val7)
}


function validatenumberforData(val1, val2, val3,val4,val5,val6,val7){

  const fetchData = async () => {
    let csrftoken=token
    
    axios.get(`${domain}/request/api/validateTelData`,{
      params: {
        csrftoken,
        network:val4,
        customer:val1 
      },
      withCredentials: true
    }).then((res)=>{ 

        if(val5==="MTN (CG) DATA"){
          checkBalanceApi2(val1, val2, val3,val4,val5,val6,val7)
        }
        else{
          checkBalanceApi1(val1, val2, val3,val4,val5,val6,val7)
        }

    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {

        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
}

fetchData();

}

function checkBalanceApi1(val1, val2, val3,val4,val5,val6,val7){
  const fetchData = async () => {
    let csrftoken=token
    
    axios.get(`${domain}/request/api/verifyMytransaction`,{
      params: {
        csrftoken,
        amount:val6
      },
      withCredentials: true
    }).then((res)=>{ 
      setLoad(false)

      PaymentConfig(val1, val2, val3,val4,val5,val6,val7)
    })
    .catch((error)=>{
      console.log("oooooooooooooooooooooo")
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();
}

function checkBalanceApi2(val1, val2, val3,val4,val5,val6,val7){


  const fetchData = async () => {
    let csrftoken=token
    
    axios.get(`${domain}/request/api2/verifyMytransaction2`,{
      params: {
        csrftoken,
        amount:val6
      },
      withCredentials: true
    }).then((res)=>{ 
      setLoad(false)
      PaymentConfig(val1, val2, val3,val4,val5,val6,val7)

    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();
}

function buyDataApi1(val1, val2, val3,val4,val5 ,val6){

  console.log(val1, val2, val3,val4,val5,val6)

  const fetchData = async () => {
  
    
    axios.get(`${domain}/post/api/buyData`,{
      params: {
        network:val2,
        phone:val1 ,
        amount:val3
      },
      withCredentials: true
    }).then((res)=>{ 

      if(res.data.express.status){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'your request was suucessful',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
  };

  fetchData();

}

function buyDataApi2(val1, val2, val3,val4,val5,val6){
  console.log(val1, val2, val3,val4,val5,val6)

  const fetchData = async () => {
    
    axios.get(`${domain}/post/api2/buyData2`,{
      params: {
        network:1,
        customer:val1 ,
        amount:networkPlanId
      },
      withCredentials: true
    }).then((res)=>{ 

      if(res.data.express.status){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'your request was successful',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
};

fetchData();

}


function buyDisco(val1, val2, val3,val4,val5,val6,val7){
  console.log(val1, val2, val3,val4,val5,val6,val7)
  
  const fetchData = async () => {

    axios.get(`${domain}/post/api2/buyDisco2`,{
      params: {
        disco_id:val2 ,
        meternumber:val4,
        amount:val6,
        email:val3,
        customerName:val5
      },
      withCredentials: true
    }).then((res)=>{ 

      setLoad(false)
      let code=""+res.data.express.payLoad

     window.localStorage.setItem("code",code) 
     Swal.fire({
      title: 'input your unit code',
      text: `${code}`,

      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      allowOutsideClick: false
    }).then(function () {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'your prepaid code has been sent to your email',
        showConfirmButton: false,
        timer: 2000
      })
    });


    })
    .catch((error)=>{
      console.log(error)
      setLoad(false)
      setTimeout(() => {
        document.querySelector("#alert").textContent=error.response.data.express.payLoad
      }, 500);
    })
}

fetchData();
}

function startProcessingAirTime(){
  let val1=document.getElementById("phone").value
  let val2=document.getElementById("airTimeNetwork").value
  let val3=item_codeAirtime
  let val4=document.getElementById("amount").value
  let val5=networkToRecharge
  let val6=val4
  let val7=`purchase of airTime (${val4}-${val5})`

  startValidationOnAirTimeP(val1, val2, val3,val4, val5,val6, val7)
  setLoad(true)
}


  function startValidationOnAirTimeP(val1, val2, val3,val4, val5,val6, val7){
    const fetchData = async () => {


          let csrftoken=token
          console.log(val1, val2, val3,val4, val5,val6, val7)
          
          axios.get(`${domain}/request/api3/validateNumber3`,{
            params: {
              csrftoken,
              item_code:val3,
              code:val2 ,
              customer:val1,
              network:val5,
            },
            withCredentials: true
          }).then((res)=>{ 

           //console.log(res.data.express.payLoad)
                checkbalanceAirtime(val1, val2, val3,val4, val5,val6, val7)
      
          })
          .catch((error)=>{
            console.log(error)
            setLoad(false)
            setTimeout(() => {
              document.querySelector("#alert").textContent=error.response.data.express.payLoad
            }, 500)
          })

    };

    fetchData();

  }



  function checkbalanceAirtime(val1, val2, val3,val4, val5,val6, val7){
    const fetchData = async () => {
  
          let csrftoken=token
          axios.get(`${domain}/request/api2/verifyMytransaction3`,{
            params: {
              csrftoken,
              amount:val4 ,
            },
            withCredentials: true
          }).then((res)=>{ 

             // console.log(res.data.express.status)
              console.log(res.data.express.payLoad)
              
              setLoad(false)
              PaymentConfig(val1, val2, val3,val4, val5,val6, val7)

          })
          .catch((error)=>{
            setLoad(false)
            setTimeout(() => {
              document.querySelector("#alert").textContent=error.response.data.express.payLoad
            }, 300);
          })

    };

    fetchData();
  }


  function buyAirtime(val1, val2, val3,val4){
    const fetchData = async () => {
   
          axios.get(`${domain}/post/api3/buyAirtime3`,{
            params: {
              amount:val4 ,
              customer:val1 ,
          
            },
            withCredentials: true
          }).then((res)=>{ 
              if(res.data.express.status){
              }
            
          })
          .catch((error)=>{
        //    console.log(error)
            setTimeout(() => {
              document.querySelector("#alert").textContent=error.response.data.express.payLoad
            }, 500);
     

          })
    };

    fetchData();
  }



  function handleApiCall2(network, dataType){

    const fetchData = async () => {

         let csrftoken=token

          axios.get(`${domain}/request/api2/dataPriceListAndDataID2`,{
            params: {
              csrftoken
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad
              console.log(payLoad)
              setDataServicePlan(payLoad)

          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })


    };

    fetchData();

  }
  function handleApiCall(network, dataType){

    const fetchData = async () => {
  
         let csrftoken=token

          axios.get(`${domain}/request/api/dataPriceListAndDataID`,{
            params: {
              csrftoken,
              network,
              dataType
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad
              setDataServicePlan(payLoad)

          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })
      
    };

    fetchData();

  }

  const displayService=service.map((data,index)=>{

          return(
            <option key={index} value={data.name} >{data.service}</option>
          )     
  })
  
  const displayDataService=dataService.map((data,index)=>{

    return(
     
      <option key={index} value={data.name} datacode={data.networkCode} datatype={data.service} >{data.service}</option>
    )
  })


  const displaydataServicePlan=dataServicePlan.map((data,index)=>{
    return(
      <option key={index} value={data.dataID} datacode2={data.package_id} price={data.price}>&#8358;{ data.price + " => " } {data.Size} {"  " } {data.validity} </option>
    )
  })

  
  const displayAirTimeNetwork=airTimeNetwork.map((data,index)=>{
    return(
      <option key={index} value={data.biller_code} networktorecharge={data.network} item_code={data.item_code} >{data.name} </option>
    )
  })

  const displayCableService=cableService.map((data,index)=>{
    return(
      <option key={index} value={data.id} name={data.name} >{data.name} </option>
    )
  })


  const displayCableBundle=cableBundle.map((data,index)=>{
    return(
      <option key={index} value={data.package_code} price={data.price} >{data.package_name+ "  =>  " }{data.price} </option>
    )
  })

  const displayDiscoProvider=discoProvider.map((data,index)=>{
    return(
      <option key={index} value={data.ck_id}>{data.provider}</option>
    )
  })

  


  useEffect(()=>{


    //initializePayment = usePaystackPayment(configData);
    
    console.log("hhhhhhhhhhhhhhhhhhhhhhhh")
    const fetchData = async () => {
      axios.get(`${domain}/request/form`,{
        withCredentials: true
      }).then((res)=>{ 

          setToken(res.data.express.payLoad)
          setFlutterwavePublicKey(res.data.express.payLoad2)
          setPaystackPublicKey(res.data.express.payLoad3)
          let csrftoken=res.data.express.payLoad
          
          axios.get(`${domain}/request/api/myservice`,{
            params: {
              csrftoken
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad
              setMyService(payLoad)
       //       console.log(payLoad)
          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })


          axios.get(`${domain}/request/api/myDataService`,{
            params: {
              csrftoken
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad

              setDataService(payLoad)
             // setDataServiceStatus(payLoad)
          })
          .catch((error)=>{
            //console.log(error.response.data.express)
          })



          axios.get(`${domain}/request/api3/getAirTimedata3`,{
            params: {
              csrftoken
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad

              //console.log(payLoad)
              setAirTimeNetwork(payLoad)
             // setDataService(payLoad)
             // setDataServiceStatus(payLoad)
          })
          .catch((error)=>{
            //console.log(error.response.data.express)
          })




          let network="MTN"
          let dataType="SME"

          axios.get(`${domain}/request/api/dataPriceListAndDataID`,{
            params: {
              csrftoken,
              network,
              dataType
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad

              setDataServicePlan(payLoad)
              setDataServicePlanInitial(payLoad)


          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })



            
          axios.get(`${domain}/request/api2/myCableService2`,{
            params: {
              csrftoken,
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad
              setcableService(payLoad)

          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })


          axios.get(`${domain}/request/api2/myCableBundle2`,{
            params: {
              csrftoken,
              cableType:"DSTV"
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad
              setcableBundle(payLoad)

              console.log(payLoad)
              setCableServicePlanInitial(payLoad)

          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })


          axios.get(`${domain}/request/api2/myDiscoService2`,{
            params: {
              csrftoken,
            },
            withCredentials: true
          }).then((res)=>{ 
              const payLoad=res.data.express.payLoad

              console.log(payLoad)
              setDiscoProvider(payLoad)

          })
          .catch((error)=>{
            console.log(error.response.data.express)
          })


        })
        .catch((error)=>{
        console.log(error.response)
        })        
    };

    fetchData();
    
  },[configData, isClick])




  return (
    <section  className="quickPay-section" >
    <div className="container" >
      <div className="row" >
        <div className="col-xl-12">
          <div className="contact-form-wrapper">
            <div className="row">
              <div className="col-xl-10 col-lg-8 mx-auto">
                <div className="section-title text-center">
                  <span> Quick Payment </span>
                </div>
              </div>
            </div>
            <hr/>
            <form action="#" className="contact-form quickPay-form" onSubmit={(e)=>payNow(e)}>
                <div className="row">
                    <div className="col-md-12">
                        <label className='label'>I want to </label>
                        <select className="form-select" id='select1' aria-label="Default select example" onChange={(e)=>{handleChange1(e)}} required>
                        {displayService}
                        </select>
                    </div>
                </div>

                  {dataServiceStatus?
                      <>
                         <div className="row">
                           <div className="col-md-12">
                               <label className='label'>Type</label>
                               <select  className="form-select"  aria-label="Default select example" onChange={(e)=>{handleChange2(e)}} required>
                                {displayDataService}
                               </select>
                           </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                                <label className='label'>Select Bundle</label>
                                <select defaultValue=""  className="form-select"  id='displaydataServicePlan' aria-label="Default select example"  onChange={(e)=>{handleChange4(e)}} required>
                                    <option disabled value="" > -- select an option -- </option>
                                    {displaydataServicePlan}
                                </select>
                            </div>
                          </div>
                      </>
                         :''}



                  {electricityServiceStatus?
                      <>
                         <div className="row">
                           <div className="col-md-12">
                               <label className='label'>Type</label>
                               <select  defaultValue="" id='displayDiscoProvider'  className="form-select"  aria-label="Default select example" onChange={(e)=>{handleChange8(e)}} required>
                               <option disabled value="" > -- select an option -- </option>
                                {displayDiscoProvider}
                               </select>
                           </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <label className='label'>Meter Number:</label>
                              <input type="number" name="MeterNo" id="MeterNo" placeholder="Enter your meter no" required />
                            </div>
                            <div className="col-md-12">
                              <label className='label'>Amount:</label>
                              <input type="number" name="price" id="DiscoPrice" placeholder="Enter amount" required />
                            </div>
                          </div>
                      </>
                      :''}


                         
                  {cableSubServiceStatus?
                      <>
                         <div className="row">
                           <div className="col-md-12">
                               <label className='label'>Type</label>
                               <select  className="form-select"  aria-label="Default select example" onChange={(e)=>{handleChange6(e)}} required>
                                {displayCableService}
                               </select>
                           </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                                <label className='label'>Select Bundle</label>
                                <select defaultValue=""  className="form-select"  id='displayCableBundle' aria-label="Default select example"  onChange={(e)=>{handleChange7(e)}} required>
                                    <option disabled value="" > -- select an option -- </option>
                                    {displayCableBundle}
                                </select>
                            </div>

                            <div className="col-md-12">
                              <label className='label'>Smart Card Number:</label>
                              <input type="number" name="cardNo" id="cardNo" placeholder="Enter smart card no" required />
                              
                            </div>
                          </div>
                      </>
                         :''}


                    {airTimeServiceStatus?
                      <>
                         <div className="row">
                           <div className="col-md-12">
                               <label className='label'></label>
                               <select className="form-select" id='airTimeNetwork'  aria-label="Default select example" onChange={(e)=>{handleChange3(e)}} required>
                                {displayAirTimeNetwork}
                               </select>
                           </div>
                          </div>
                      </>
                         :''}
              
                <div className="row">
                  <div className="col-md-6">
                    <label className='label'>Phone no:</label>
                    <input type="number" name="phone" id="phone" placeholder="Phone" required />
                  </div>

                  {airTimeServiceStatus?
                  
                      <div className="col-md-6">
                        <label className='label'>Amount:</label>
                        <input type="number" name="phone" id="amount" placeholder="Amount" required />
                      </div>
                    :''}
                  
                      <div className="col-md-6">
                        <label className='label'>Email address for receipt</label>
                        <input type="email" name="email" id="email" placeholder="Enter" onChange={(e)=>{handleChange5(e)}} required />
                      </div>
                  
                </div>
                <div id='confirmation'> </div>

              {load?
                      <Loader1/>
                    :
                    <>  
                      <div id='alert'>    
                      </div>
                     
                    </>
              }
  
                  <div className="row">
                    <div className="col-12">
                      <div className="button text-center rounded-buttons">
                        <button type="submit" className="btn primary-btn rounded-full" >
                          Pay now
                        </button>
                      </div>
                    </div>
                  </div>
                    
                 
            </form>

            <button  id="flutterWaveButton" style={{"display":"none"}}
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                    if(response.status==="successful"){

                        if(selectedService==="data"){
                            if(serviceData.val5==="MTN (CG) DATA"){
                              buyDataApi2(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)
                              
                              axios.get(`${domain}/post/api/sendEmailA`,{
                                params: {
                                  tel:serviceData.val1,
                                  flw_ref:response.flw_ref ,
                                  transaction_id:response.transaction_id,
                                  billDetails:serviceData.val7,
                                  amont:response.amount,
                                  email:response.customer.email,
                                  serviceType:selectedService

                                },
                                withCredentials: true
                              }).then((res)=>{ 
                    
                              })
                              .catch((error)=>{
                                console.log(error)
                    
                              })
                            }
                            else{
                              buyDataApi1(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)
              
                              axios.get(`${domain}/post/api/sendEmailA`,{
                                params: {
                                  tel:serviceData.val1,
                                  flw_ref:response.flw_ref ,
                                  transaction_id:response.transaction_id,
                                  billDetails:serviceData.val7,
                                  amont:response.amount,
                                  email:response.customer.email,
                                  serviceType:selectedService

                                },
                                withCredentials: true
                              }).then((res)=>{ 
                    
                              })
                              .catch((error)=>{
                                console.log(error)
                    
                              })
                            
                            }
                        }
                        else if(selectedService==="airtime"){
                          buyAirtime(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)
                          
                          axios.get(`${domain}/post/api/sendEmailA`,{
                            params: {
                              tel:serviceData.val1,
                              flw_ref:response.flw_ref ,
                              transaction_id:response.transaction_id,
                              billDetails:serviceData.val7,
                              amont:response.amount,
                              email:response.customer.email,
                              serviceType:selectedService

                            },
                            withCredentials: true
                          }).then((res)=>{ 
                
                          })
                          .catch((error)=>{
                            console.log(error)
                
                          })
                        }
                        else if(selectedService==="cable subscription"){
                          buyCableSub(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)
                          
                          axios.get(`${domain}/post/api/sendEmailA`,{
                            params: {
                              tel:serviceData.val1,
                              flw_ref:response.flw_ref ,
                              transaction_id:response.transaction_id,
                              billDetails:serviceData.val7,
                              amont:response.amount,
                              email:response.customer.email,
                              serviceType:selectedService

                            },
                            withCredentials: true
                          }).then((res)=>{ 
                            console.log(res.data.express.payLoad)
                          })
                          .catch((error)=>{
                            console.log(error)
                
                          })
                        }
                        else if(selectedService==="electricity"){
                          buyDisco(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)

                        
                          axios.get(`${domain}/post/api/sendEmailA`,{
                            params: {
                              tel:serviceData.val1,
                              flw_ref:response.flw_ref ,
                              transaction_id:response.transaction_id,
                              billDetails:serviceData.val7,
                              amont:response.amount,
                              email:response.customer.email,
                              serviceType:selectedService

                            },
                            withCredentials: true
                          }).then((res)=>{ 

                        
                          })
                          .catch((error)=>{
                            console.log(error)
                
                          })
                        }
                    }else{

                    }
                    closePaymentModal() // this will close the modal programmatically
                },
            onClose: () => {},
          });
        }}
      >
            </button>

            <PaystackHookExample networkPlanIdP={networkPlanId} userOfEmailP={userOfEmail} selectedServiceP={selectedService} serviceDataP={serviceData} isClickP={isClick} configP={configData} />

          </div>
        </div>
      </div>
    </div>

  </section>
  )
}



const PaystackHookExample = (props) => {
  const initializePayment = usePaystackPayment(props.configP);
  const buttonRef = useRef();



  function buyDataApi2(val1, val2, val3,val4,val5,val6){
    console.log(val1, val2, val3,val4,val5,val6)
    let networkPlanId=props.networkPlanIdP

    const fetchData = async () => {
      
      axios.get(`${domain}/post/api2/buyData2`,{
        params: {
          network:1,
          customer:val1 ,
          amount:networkPlanId
        },
        withCredentials: true
      }).then((res)=>{ 
  
        if(res.data.express.status){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'your request was successful',
            showConfirmButton: false,
            timer: 1500
          })
        }
        
      })
      .catch((error)=>{
        console.log(error)
       // setLoad(false)
       /*
        setTimeout(() => {
          document.querySelector("#alert").textContent=error.response.data.express.payLoad
        }, 500)
        */
      })
  };
  
  fetchData();
  
  }


  function buyDataApi1(val1, val2, val3,val4,val5 ,val6){

    console.log(val1, val2, val3,val4,val5,val6)
  
    const fetchData = async () => {
    
      
      axios.get(`${domain}/post/api/buyData`,{
        params: {
          network:val2,
          phone:val1 ,
          amount:val3
        },
        withCredentials: true
      }).then((res)=>{ 
  
        if(res.data.express.status){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'your request was suucessful',
            showConfirmButton: false,
            timer: 1500
          })
        }
        
      })
      .catch((error)=>{
        console.log(error)
       // setLoad(false)
       /*
        setTimeout(() => {
          document.querySelector("#alert").textContent=error.response.data.express.payLoad
        }, 500);
        */
      })
    };
  
    fetchData();
  
  }

  const onSuccess = (reference) => {

    console.log(reference);
    console.log(props.serviceDataP);
    const selectedService=props.selectedServiceP
    const serviceData=props.serviceDataP

    if(selectedService==="data"){
      if(serviceData.val5==="MTN (CG) DATA"){

        buyDataApi2(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)
        
          axios.get(`${domain}/post/api/sendEmailA`,{
            params: {
              tel:serviceData.val1,
              reference:reference.reference ,
              transaction_id:reference.transaction,
              billDetails:serviceData.val7,
              amont:serviceData.val6,
              email:props.userOfEmailP,
              serviceType:selectedService
            },
            withCredentials: true
          }).then((res)=>{ 

          })
          .catch((error)=>{
            console.log(error)

          })
      }
      else{
        buyDataApi1(serviceData.val1, serviceData.val2, serviceData.val3,serviceData.val4,serviceData.val5,serviceData.val6,serviceData.val7)

          axios.get(`${domain}/post/api/sendEmailA`,{
            params: {
              tel:serviceData.val1,
              reference:reference.reference ,
              transaction_id:reference.transaction,
              billDetails:serviceData.val7,
              amont:serviceData.val6,
              email:props.userOfEmailP,
              serviceType:selectedService
            },
            withCredentials: true
          }).then((res)=>{ 

          })
          .catch((error)=>{
            console.log(error)
          })
      
      }
    }

  };
  
  const onClose = () => {
    console.log('closed')
  }
  

  useEffect(()=> {

    console.log("props.isClickP")
    console.log(props.isClickP)
    if(props.isClickP===true){
      buttonRef.current.click();
    }

  },[props.isClickP])

  return (
    <>
        <button ref={buttonRef} style={{"display":"none"}}
        onClick={() => {
            initializePayment(onSuccess, onClose)
        }}></button>
    </>
  );
};
