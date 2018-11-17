import { httpClientInstance } from "../utils/httpClient";

export async function loadProducts() {
  const response = httpClientInstance.get("/buyers");
  return response;
}

export async function loadWishes(bId) {
  const response = httpClientInstance.get("/buyers/getWish?bId=" + bId);
  return response;
}

export async function loadCartItems(bId) {
  const response = httpClientInstance.get("/buyers/getCart?bId=" + bId);
  return response;
}

export async function deleteCartItemCall(cId) {
  const response = httpClientInstance.get("/buyers/deleteCartItem?cId=" + cId);
  return response;
}

export async function checkoutCall(bId) {
  const response = httpClientInstance.get("/buyers/checkout?bId=" + bId);
  return response;
}

export async function loadOrders(bId) {
  const response = httpClientInstance.get("/buyers/getOrder?bId=" + bId);
  return response;
}

export async function updateProfileCall(bId, name, email, bank, address) {
  const response = httpClientInstance.get(
    "/buyers/updateProfile?bId=" +
      bId +
      "&name=" +
      name +
      "&email=" +
      email +
      "&bank=" +
      bank +
      "&address=" +
      address
  );
  return response;
}

export async function addToWish(bId, pId) {
  const response = httpClientInstance.get(
    "/buyers/addWish?bId=" + bId + "&pId=" + pId
  );
  return response;
}

export async function loginBuyer(phone, password) {
  const response = httpClientInstance.get(
    "/buyers/login/?phone=" + phone + "&password=" + password
  );
  return response;
}

export async function loadProductById(id) {
  const response = httpClientInstance.get("/buyers/getProduct/?pId=" + id);
  console.log("API: getting product by id");
  return response;
}

export async function addCartItem(pId, bId, quantity) {
  console.log("webServices called: addCartItem", pId, bId, quantity);
  const response = httpClientInstance.get(
    "buyers/addCartItem?pId=" + pId + "&bId=" + bId + "&quantity=" + quantity
  );
  return response;
}

export async function registerBuyer(
  name,
  address,
  bank,
  phone,
  email,
  password
) {
  // console.log("webServices called: register buyer", name, phone, email);
  const response = httpClientInstance.get(
    "buyers/register?name=" +
      name +
      "&bank=" +
      bank +
      "&address=" +
      address +
      "&email=" +
      email +
      "&phone=" +
      phone +
      "&password=" +
      password
  );
  return response;
}
