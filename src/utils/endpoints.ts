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
  },
};
