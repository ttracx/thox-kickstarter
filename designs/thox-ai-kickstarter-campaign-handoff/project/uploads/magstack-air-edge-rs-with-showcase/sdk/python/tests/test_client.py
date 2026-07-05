from magstack_air_sdk import MagStackAirClient, MagStackAirError


def test_client_requires_token_for_authenticated_request():
    client = MagStackAirClient(token="")
    try:
        client.status()
    except MagStackAirError as exc:
        assert "token" in str(exc)
    else:
        raise AssertionError("expected MagStackAirError")


def test_client_builds_dataclass():
    client = MagStackAirClient(base_url="http://leader.local:8787", token="abc")
    assert client.base_url == "http://leader.local:8787"
    assert client.token == "abc"
