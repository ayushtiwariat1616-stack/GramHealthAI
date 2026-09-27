import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = os.getenv("INTENT_MODEL", "openai/gpt-oss-20b")

VALID_INTENTS = {
    "GREETING",
    "IDENTITY",
    "HEALTH",
    "GENERAL",
    "EMERGENCY",
}


def classify_intent(message: str) -> str:

    prompt = f"""
Classify the following user message into exactly one category.

Categories:

GREETING:
Simple greetings such as hello, hi, good morning.

IDENTITY:
Questions asking who you are, what you are, or what GramHealthAI does.

HEALTH:
ANY question related to:
- diseases
- symptoms
- prevention
- treatment awareness
- medicines
- nutrition
- fitness
- pregnancy
- fever
- dengue
- malaria
- diabetes
- blood pressure
- mental health
- general healthcare

EMERGENCY:
Messages describing severe or potentially life-threatening health situations
such as unconsciousness, severe bleeding, chest pain, difficulty breathing,
poisoning, seizures, or suicidal thoughts.

GENERAL:
Anything completely unrelated to health.

Examples:

"Hello" -> GREETING
"Who are you?" -> IDENTITY
"How to prevent dengue?" -> HEALTH
"What are symptoms of malaria?" -> HEALTH
"I have fever" -> HEALTH
"What foods are good for diabetes?" -> HEALTH
"I cannot breathe properly" -> EMERGENCY
"Who is the Prime Minister of India?" -> GENERAL

Message:
{message}

Return only JSON in this exact format:

{{"intent": "HEALTH"}}
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        reasoning_effort="low",
        include_reasoning=False,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
    )

    try:
        data = json.loads(response.choices[0].message.content)
        intent = data.get("intent", "GENERAL").strip().upper()

        if intent in VALID_INTENTS:
            return intent

    except Exception as e:
        print("Intent classification error:", e)

    return "GENERAL"