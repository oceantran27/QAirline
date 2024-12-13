import axios from "axios";

export const fetchCustomerInfo = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3030/api/customer/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};

export const updateCustomerInfo = async (updateData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put("http://localhost:3030/api/customer/update", updateData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.message;
};
