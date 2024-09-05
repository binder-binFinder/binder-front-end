import { instance } from "./axios";

const accessToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImJqaXdvbjAzMjRAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNTQxMDU5NiwiZXhwIjoxNzI2MDE1Mzk2fQ.uNobp7qH26k9e9q4fCgy3EVNtQFQzDG8FI3TQGRmFXpr5w1wvoISjpj2lGcIEiv1k3CZw5UIFERcr8CK8M-YjQ";

export async function getMembersMe() {
  try {
    const response = await instance.get("members/me", {
      headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("getError :", error);
    throw error;
  }
}
