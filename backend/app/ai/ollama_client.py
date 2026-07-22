from ollama import Client
from app.ai.prompts import SYSTEM_PROMPT

client = Client(host="http://localhost:11434")


def generate_response(
    user_message: str,
    docs,
    language: str = "English",
) -> dict:

    context = "\n\n".join(doc.page_content for doc in docs)

    sources = sorted(
        {
            source
            for doc in docs
            for source in doc.metadata.get("primary_sources", [])
        }
    )

    language_instruction = {
        "English": """
Answer completely in simple English.

Rules:
- Use short sentences.
- Use bullet points whenever useful.
- Explain medical terms simply.
- Keep the answer practical and easy to understand.
""",

        "हिन्दी": """
उत्तर केवल सरल हिन्दी में दें।

नियम:
- आसान शब्दों का प्रयोग करें।
- छोटे वाक्य लिखें।
- जहाँ उचित हो वहाँ बुलेट पॉइंट्स का प्रयोग करें।
- उत्तर ऐसा हो जिसे गाँव का आम व्यक्ति आसानी से समझ सके।
""",

        "Hinglish": """
Answer ONLY in natural Indian Hinglish.

Rules:
- Write Hindi using English letters.
- Mix English words naturally.
- Do NOT translate every English word.
- Use short conversational sentences.
- Use bullet points where appropriate.

Example:
Malaria ke common symptoms hain:

• High fever
• Thand lagna
• Sir dard
• Body pain
• Bahut thakan

Agar ye symptoms dikhen to doctor se consult karein.
"""
    }.get(language, "Answer in simple English.")

    prompt = f"""
You are answering a health question using retrieved knowledge.

========================
RETRIEVED CONTEXT
========================

{context}

========================
USER QUESTION
========================

{user_message}

========================
LANGUAGE
========================

{language_instruction}

========================
RULES
========================

1. Answer ONLY using the retrieved context above.

2. Never use outside knowledge.

3. If the answer is not found in the context, reply exactly:

I don't know based on the available health information.

4. Never mention file names or sources.

5. Never diagnose a disease.

6. Never prescribe medicines or dosages.

7. Use Markdown formatting.

8. Prefer bullet points over long paragraphs.

9. If the context describes an emergency, clearly advise the user to seek immediate medical care.

10. Keep the answer concise, accurate, and easy to understand.

Answer:
"""

    print("Generating response...")

    response = client.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    print("Ollama finished!")

    return {
        "answer": response["message"]["content"].strip(),
        "sources": sources,
    }