export const endpoints = {
  auth: {
    sendOtp: "auth/send-otp",
    verifyOtp: "auth/verify-otp",
    register: "auth/register",
  },
  products: {
    sections: "section",
    categories: (sectionId: string) => `section/${sectionId}/categories`,
    subCategories: (categoryId: string) =>
      `category/${categoryId}/subcategories`,
    products: "product/all-products-for-client",
    singleProduct: "product/single-product-client",
    brands: "product/get-brands-client",
    offers: "product/all-products-offers-for-client",
  },
  banars: "banar/guest",

  orders: "order/client-orders",
  singleOrder: (order_id: string) => `order/single-order/${order_id}`,
  singleShipment: (shipment_id: string) =>
    `order/single-shipment/${shipment_id}`,
  cancelShipment: (shipment_id: string) =>
    `shipment/cancel-shipment/${shipment_id}`,
  getReasons: (type: string) => `reason/all?type=${type}`,
  addShipmentFeedback: "shipment/add-shipment-feedback",
  returnOrder: (order_id: string) => `order/return-order/${order_id}`,
};
