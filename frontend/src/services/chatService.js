import api from "./api";

export async function sendMessage(message, language) {
  const { data } = await api.post("/chat", {
    message,
    language,
  });
  console.log("Response from backend:", data);
  return data;
}