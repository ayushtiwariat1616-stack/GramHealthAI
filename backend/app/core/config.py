from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "GramHealthAI"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = "AI-powered Rural Health Awareness Assistant"

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    DEBUG: bool = False

    GROQ_API_KEY: str
    MODEL_NAME: str = "llama-3.3-70b-versatile"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()