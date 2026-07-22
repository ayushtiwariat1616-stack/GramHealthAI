import axios from "axios";

export async function sendMessage(message, language) {
  const { data } = await axios.post(
    "http://localhost:8000/chat",
    {
      message,
      language,
    }
  );

  return data;
}