"""Consistent JSON error responses for clients (validation, etc.)."""

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


def _clean_validation_message(msg: str) -> str:
    """Strip Pydantic's prefix so clients see the message from our validators."""
    prefix = "Value error, "
    if msg.startswith(prefix):
        return msg[len(prefix) :].strip()
    return msg


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        details = []
        for err in exc.errors():
            loc = err.get("loc", ())
            parts = [str(p) for p in loc if p not in ("body", "query", "path", "header")]
            field = ".".join(parts) if parts else "request"
            raw_msg = err.get("msg", "Invalid value.")
            details.append(
                {"field": field, "message": _clean_validation_message(raw_msg)}
            )
        return JSONResponse(
            status_code=422,
            content={
                "error": "validation_error",
                "message": "The request data is invalid. See details.",
                "details": details,
            },
        )
