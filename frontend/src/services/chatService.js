import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function sendMessage(message, language) {
  const { data } = await axios.post(
    `${API_URL}/chat`,
    {
      message,
      language,
    }
  );

  return data;
}