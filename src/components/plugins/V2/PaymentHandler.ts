import axios from 'axios';
import FormData  from 'form-data';

export const acceptPayment =async ()=> {
    const data = new FormData();
    data.append('client_key', '65e509c7-c359-4ae7-ba61-05b55e1d6c54');
    data.append('order_id', '434343test32232');
    data.append('hash', '4ec0e3ce714957569a749b2110ded792');
    data.append('order_amount', '0.11');
    data.append('card_number', '5123450000000008');
    data.append('card_exp_month', '01');
    data.append('card_exp_year', '2039');
    data.append('card_cvv2', '100');
    data.append('payer_phone', '+966559344333');
    data.append('payer_country', 'SA');
    data.append('payer_address', 'Mohali');
    data.append('action', 'SALE');
    data.append('payer_zip', '623524');
    data.append('payer_ip', '176.44.76.100');
    data.append('order_currency', 'SAR');
    data.append('payer_first_name', 'Abdulrhman');
    data.append('payer_city', 'Riyadh');
    data.append('auth', 'N');
    data.append('payer_last_name', 'alnafisah');
    data.append('order_description', 'Test Order');
    data.append('payer_email', 'maheshvar@yopmail.com');
    data.append('term_url_3ds', 'https://ss.stagingsdei.com:3398/api/v1/payment/receive-payment');
    data.append('recurring_init', 'N');
    data.append('req_token', 'N');
    data.append('merchant_origin', 'http://pay.edfapay.com');
    data.append('card_scheme', 'VISA');
    
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.edfapay.com/payment/post',
        headers: {
          'Content-Type': 'multipart/form-data', // Let the browser handle boundaries
          authorization: ''
        },
        data: data,
      };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log("paymentDataresponse ::::::::;",response)
    })
    .catch((error) => {

      console.log("error ::::::::::", error);
    });
}

