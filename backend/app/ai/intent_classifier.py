import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv(
    "MODEL_NAME",
    "llama-3.3-70b-versatile"
)

VALID_INTENTS = {
    "GREETING",
    "IDENTITY",
    "HEALTH",
    "GENERAL",
    "EMERGENCY",
}


def classify_intent(message: str) -> str:

    prompt = f"""
You are an intent classification system.

Classify the message into EXACTLY ONE category.

GREETING
IDENTITY
HEALTH
GENERAL
EMERGENCY

Definitions:

GREETING:
Hello, Hi, Good Morning, Hey

IDENTITY:
Who are you?
What is your name?
What can you do?

HEALTH:
Diseases
Symptoms
Medicine
Nutrition
Food
Exercise
Mental Health
Pregnancy
Vaccination
Hospitals
Doctors
First Aid
Healthy Lifestyle

EMERGENCY:
Chest pain
Difficulty breathing
Heavy bleeding
Poisoning
Stroke
Heart attack
Suicide
Unconscious
Snake bite

GENERAL:
Everything else.

Reply ONLY with ONE WORD.

Message:
{message}
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        max_tokens=10,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    result = response.choices[0].message.content.strip().upper()

    for intent in VALID_INTENTS:
        if intent in result:
            return intent

    return "GENERAL"