import os

from groq import Groq
from dotenv import load_dotenv

from app.ai.prompts import SYSTEM_PROMPT

load_dotenv()
print("Groq Key:", os.getenv("GROQ_API_KEY"))
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv(
    "MODEL_NAME",
    "llama-3.3-70b-versatile"
)


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
- Use short conversational sentences.
- Use bullet points where appropriate.
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

5. Never diagnose diseases.

6. Never prescribe medicines.

7. Use Markdown formatting.

8. Prefer bullet points.

9. If the context describes an emergency, advise immediate medical care.

10. Keep the answer concise.

Answer:
"""

    print("Generating response with Groq...")

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.3,
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

    print("Groq finished!")

    return {
        "answer": response.choices[0].message.content.strip(),
        "sources": sources,
    }