// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const GetTransactionByUser = async (page, pageSize, userId, status) => {
  try {
    const url = `${baseUrl}/api/Transactions/user/${userId}?Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetAllTransaction = async (page, pageSize) => {
  try {
    const url = `${baseUrl}/api/Transactions?PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error("There was a problem with API");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetTransactionByStatus = async (status, page, pageSize) => {
  try {
    const url = `${baseUrl}/api/Transactions?Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await fetch(url, request);
    return response;
  } catch (err) {
    console.log(err);
  }
};
