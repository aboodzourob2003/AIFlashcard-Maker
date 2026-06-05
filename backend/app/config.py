from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    default_provider: str = "openai"

    database_url: str = "postgresql://postgres:password@localhost:5432/flashcard_db"

    jwt_secret: str = "change-me"
    jwt_expire_hours: int = 24

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
