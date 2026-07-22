from ollama import Client

client = Client(host="http://localhost:11434")


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
"""

    response = client.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": prompt + "\n\nMessage:\n" + message
            }
        ],
    )

    result = response["message"]["content"].strip().upper()

    for intent in VALID_INTENTS:
        if intent in result:
            return intent

    return "GENERAL"