from app.ai.intent_classifier import classify_intent
from app.ai.memory import ConversationMemory
from app.ai.ollama_client import generate_response
from app.rag.retriever import retrieve_context

memory = ConversationMemory()


class ChatService:

    def get_response(
    self,
    message: str,
    language: str = "English",
):

        memory.add("user", message)

        intent = classify_intent(message)

        if intent == "GREETING":
            return (
                "👋 Hello! I am GramHealthAI.\n\n"
                "How can I help you with your health today?"
            )

        if intent == "IDENTITY":
            return (
                "🩺 I am GramHealthAI.\n\n"
                "I provide reliable health awareness information using a verified knowledge base."
            )

        if intent == "GENERAL":
            return (
                "I specialize in health awareness.\n\n"
                "Please ask a health-related question."
            )

        if intent == "EMERGENCY":
            return (
                "⚠️ This may be a medical emergency.\n\n"
                "Please contact your nearest hospital or emergency services immediately."
            )

        docs = retrieve_context(message)
        print("=" * 50)
        print("Retrieved Docs:", len(docs))
        for doc in docs:
            print(doc.page_content[:300])
        print("=" * 50)
        result= generate_response(
                message,
                docs,
                language,
                )

        memory.add("assistant", result["answer"])

        return result