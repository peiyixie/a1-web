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

export async function postReview(payload) {
  console.log("webServices called:");
  console.log(payload);
  const response = httpClientInstance.post(
    `/api/auth/feedbacks/${payload.tId}`,
    payload
  );
  return response;
}

export async function contributeNewToiletServer(payload) {
  console.log("webServices called:");
  console.log(payload);
  const response = httpClientInstance.post("/api/auth/toilets", payload);
  return response;
}

export async function reportIssueServer(payload) {
  const response = httpClientInstance.post("/api/auth/reports/", payload);
  return response;
}

export async function updateProfileServer(payload) {
  console.log("webServices called:");
  console.log(payload);
  const response = httpClientInstance.put("/api/auth/users", payload);
  console.log("webservices response:");
  console.log(response);
  return response;
}

export async function confirmToiletServer(payload) {
  console.log("webServices called:");
  console.log(payload);
  const response = httpClientInstance.put(
    "/api/auth/toilets/" + payload.tolietId
  );
  return response;
}

export async function findToilet(payload) {
  const response = httpClientInstance.get(
    `api/toilets/${payload.lat}/${payload.lng}/${payload.floor}/${
      payload.gender
    }`
  );
  return response;
}

export function setHeader() {
  httpClientInstance.defaults.headers.common = {
    Authorization: "Bearer ".concat(localStorage.getItem("token"))
  };
}

export async function register(payload) {
  const response = httpClientInstance.post("/api/users", payload);
  return response;
}

export async function uploadAvatar(payload) {
  const response = httpClientInstance.put("/api/auth/users/avatar", payload);
  return response;
}
