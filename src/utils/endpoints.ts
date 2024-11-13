export const endpoints = {
  auth: {
    sendOtp: "auth/send-otp",
    verifyOtp: "auth/verify-otp",
    register: "auth/register",
  },
  users: {
    getProfile: "users/get-profile",
  },
  products: {
    sections: "section",
    categories: (sectionId: string) => `section/${sectionId}/categories`,
    subCategories: (categoryId: string) =>
      `category/${categoryId}/subcategories`,
    products: "product/all-products-for-client",
    favoriteList: "product/all-Product-favorite",
    singleProduct: "product/single-product-client",
    brands: "product/get-brands-client",
    offers: "product/all-products-offers-for-client",
    favorite: ({
      productId,
      sectionId,
    }: {
      productId: string;
      sectionId: string;
    }) => `product/product-favorite/${productId}/${sectionId}`,
  },
  cart: {
    fetchProducts: "cart",
    add: "cart/add",
    delete: (cart_product_id: string) => `cart/delete/${cart_product_id}`,
    update: "cart/update/{cart}-product",
    timeSlots: (delivery_day: string) => `slot/${delivery_day}/all-slots`,
    listPayments: "payment-method",
    fetchPromoCode: (code: string, paymentMethodId: string) =>
      `promo-code/valid/{id}?code=${code}&payment_method_id=${paymentMethodId}`,
    createOrder: "order",
  },
  staticPage: {
    root: (static_page_type: string) => `static-page/${static_page_type}`,
  },
  address: {
    root: "addresses",
    delete: (id: string) => `addresses/${id}`,
    setFavorite: (id: string) => `addresses/${id}/set-favorite`,
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
