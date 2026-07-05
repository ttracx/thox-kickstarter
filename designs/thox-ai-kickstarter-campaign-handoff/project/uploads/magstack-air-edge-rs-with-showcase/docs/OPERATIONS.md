# Operations

## Recommended P0 topology

```text
1 leader Pi Zero 2 W
2 worker Pi Zero 2 W nodes
single 2.4 GHz Wi-Fi AP or router
explicit leader URL configured on every worker
```

## Demo script

```bash
export MAGSTACK_AIR_TOKEN='dev-token'
magairctl --url http://leader.local:8787 --token "$MAGSTACK_AIR_TOKEN" nodes
magairctl --url http://leader.local:8787 --token "$MAGSTACK_AIR_TOKEN" infer --text 'check node temperature and battery health'
magairctl --url http://leader.local:8787 --token "$MAGSTACK_AIR_TOKEN" tasks
```

## Hardware validation checklist

```text
- Boot leader and workers
- Verify Wi-Fi association
- Verify /health on every node
- Verify worker registration in /api/nodes
- Run ai.intent.v1 20 times
- Run ai.sensor_anomaly.v1 with normal and abnormal samples
- Kill worker mid-task and observe leader requeue after failure timeout
- Kill leader and document current P0 limitation: manual restart required
- Log CPU temperature every minute for 30 minutes
```

## Resource guardrails

Default worker capacity is `1`. Raise it only on bigger nodes.

```text
Pi Zero 2 W: capacity 1
Pi 4 / Pi 5: capacity 2-4 depending model
ThoxMini/Nova class: advertise heavier capabilities separately
```
