import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://gramhealthai-production.up.railway.app";

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