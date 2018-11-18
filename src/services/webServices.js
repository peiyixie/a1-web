import { httpClientInstance } from "../utils/httpClient";

export async function changeStatus(oId, status) {
  const response = httpClientInstance.get(
    "/sellers/setStatus?oId=" + oId + "&status=" + status
  );
  return response;
}

export async function postReviewCall(pId, rating, bId, comment, oiId) {
  const response = httpClientInstance.get(
    "/buyers/review?" +
      "pId=" +
      pId +
      "&rating=" +
      rating +
      "&bId=" +
      bId +
      "&comment=" +
      comment +
      "&oiId=" +
      oiId
  );
  return response;
}

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

export async function loadOrdersSeller(sId) {
  const response = httpClientInstance.get("/sellers/getOrder?sId=" + sId);
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

export async function updateProfileCallSeller(sId, name, email, bank, address) {
  const response = httpClientInstance.get(
    "/sellers/updateProfile?sId=" +
      sId +
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

export async function addItem(
  sId,
  name,
  description,
  url,
  quantity,
  price,
  category
) {
  const response = httpClientInstance.get(
    "/sellers/createProduct?sId=" +
      sId +
      "&name=" +
      name +
      "&description=" +
      description +
      "&filename=" +
      url +
      "&quantity=" +
      quantity +
      "&price=" +
      price +
      "&category=" +
      category
  );
  return response;
}

export async function editItem(
  pId,
  name,
  description,
  url,
  quantity,
  price,
  category
) {
  const response = httpClientInstance.get(
    "/sellers/editProduct?pId=" +
      pId +
      "&name=" +
      name +
      "&description=" +
      description +
      "&filename=" +
      url +
      "&quantity=" +
      quantity +
      "&price=" +
      price +
      "&category=" +
      category
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

export async function loginSeller(phone, password) {
  const response = httpClientInstance.get(
    "/sellers/login/?phone=" + phone + "&password=" + password
  );
  return response;
}

export async function loadProductsSeller(sId) {
  const response = httpClientInstance.get("/sellers/products?sId=" + sId);
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

export async function registerSeller(
  name,
  address,
  bank,
  phone,
  email,
  password
) {
  // console.log("webServices called: register buyer", name, phone, email);
  const response = httpClientInstance.get(
    "sellers/register?name=" +
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
