"use server"

const midtransClient = require('midtrans-client');
const serviceMidtrans = require('./service-midtrans.json');

const getSnapToken = async (order) => {
  const { Id, userId, userName, userEmail, userPhone, userAddress, appFee, shippingFee, subtotal, gross_amount, transactionTime, paidProduct } = order
  const paidProdArray = Object.values(paidProduct)
  const itemDetails = paidProdArray.filter((item) => {
    return item
  })

  const appAndShippingFee = {
    id: "FEE01",
    name: "Biaya aplikasi dan ongkir",
    quantity: 1,
    price: (appFee + shippingFee),
  }

  const { serverKey, } = serviceMidtrans

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey
  });

  const parameters = {
    "transaction_details": {
      "order_id": Id,
      "gross_amount": gross_amount
    },
    "item_details": [...itemDetails, appAndShippingFee],
    "customer_details": {
      userId,
      first_name: userName,
      email: userEmail,
      phone: userPhone,
      billing_address: { address: userAddress },
      shipping_address: {
        first_name: userName,
        email: userEmail,
        phone: userPhone, 
        address: userAddress,
      },
    },
  };

  const transaction = await snap.createTransaction(parameters)
  const transactionToken = transaction.token;
  return transactionToken
}

export default getSnapToken