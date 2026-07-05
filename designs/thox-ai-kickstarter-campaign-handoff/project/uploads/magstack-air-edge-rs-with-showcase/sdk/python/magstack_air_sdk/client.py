from __future__ import annotations

import json
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Any, Dict, Optional


class MagStackAirError(RuntimeError):
    """Raised when the MagStack Air API returns an error or invalid response."""


@dataclass(frozen=True)
class MagStackAirClient:
    """Dependency-light Python SDK for demos and integration tests.

    The core runtime is Rust. This SDK is intentionally thin: it submits work to
    a local MagStack Air leader and does not execute jobs directly.
    """

    base_url: str = "http://127.0.0.1:8787"
    token: str = ""
    timeout: float = 30.0

    def health(self) -> Dict[str, Any]:
        return self._request("GET", "/health", auth=False)

    def status(self) -> Dict[str, Any]:
        return self._request("GET", "/api/status")

    def nodes(self) -> Dict[str, Any]:
        return self._request("GET", "/api/nodes")

    def tasks(self) -> Dict[str, Any]:
        return self._request("GET", "/api/tasks")

    def infer_intent(self, text: str, sync: bool = True) -> Dict[str, Any]:
        return self.infer("ai.intent.v1", text=text, sync=sync)

    def infer_embedding(self, text: str, dims: int = 64, sync: bool = True) -> Dict[str, Any]:
        return self.infer("ai.embed_hash.v1", payload={"text": text, "dims": dims}, sync=sync)

    def infer_sensor_anomaly(self, features: list[float], sync: bool = True) -> Dict[str, Any]:
        return self.infer("ai.sensor_anomaly.v1", payload={"features": features}, sync=sync)

    def infer(
        self,
        kind: str,
        *,
        text: Optional[str] = None,
        payload: Optional[Dict[str, Any]] = None,
        sync: bool = True,
        wait_ms: int = 30_000,
    ) -> Dict[str, Any]:
        body = {"kind": kind, "text": text, "payload": payload, "sync": sync, "wait_ms": wait_ms}
        return self._request("POST", "/api/infer", body)

    def submit(self, kind: str, payload: Dict[str, Any], required_capability: Optional[str] = None) -> Dict[str, Any]:
        body = {
            "kind": kind,
            "payload": payload,
            "required_capability": required_capability or kind,
            "labels": {},
            "timeout_ms": 120_000,
            "max_output_bytes": 1024 * 1024,
        }
        return self._request("POST", "/api/tasks", body)

    def _request(self, method: str, path: str, body: Optional[Dict[str, Any]] = None, auth: bool = True) -> Dict[str, Any]:
        data = None if body is None else json.dumps(body).encode("utf-8")
        headers = {"Accept": "application/json"}
        if data is not None:
            headers["Content-Type"] = "application/json"
        if auth:
            if not self.token:
                raise MagStackAirError("token is required for authenticated endpoints")
            headers["Authorization"] = f"Bearer {self.token}"
        request = urllib.request.Request(
            self.base_url.rstrip("/") + path,
            data=data,
            headers=headers,
            method=method,
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                raw = response.read().decode("utf-8")
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as exc:
            raw = exc.read().decode("utf-8", errors="replace")
            raise MagStackAirError(f"HTTP {exc.code}: {raw}") from exc
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            raise MagStackAirError(str(exc)) from exc
