# Reply snippets

Canned replies to paste and edit. Personalize the first line; the rest is reusable.

## "Will my pledge ship on time?"

> Thanks for backing the {tier_name}. Our current timeline ships {tier_name} in {target_month_year}. If we slip more than 30 days, we send an apology Update and offer a full refund for the affected tier. The TIMELINE.md in our public install repo is the source of truth: github.com/ttracx/thoxymicro-install.

## "Can I add an extra ThoxClip?"

> Yes. After the campaign closes, BackerKit opens an add-on store. You can add a ThoxClip ($39 add-on price) and any other accessories there. We email a survey link about 30 days post-close.

## "What happens if you do not hit the funding goal?"

> Kickstarter is All-or-Nothing. If we miss $250K, no card is charged and no rewards ship. We will return with a leaner campaign the following quarter if that happens.

## "Is ThoxNova a full Linux PC?"

> Yes. It runs Linux (Buildroot by default, switchable to Debian 13). It has HDMI out, USB-A, USB-C, and an Ethernet port. You can use it as a desktop. The THOX dashboard and the local LLM are services that run alongside whatever else you want it to do.

## "Will THOX work with my existing smart-home setup?"

> Probably. The agent runtime supports MCP, MQTT, and a basic webhook adapter. If your smart-home hub speaks any of those, you can wire it up. We will publish a Home Assistant integration at the $500K stretch.

## "What is the difference between ThoxMini and ThoxAir?"

> ThoxMini is RISC-V (Milk-V Duo), 64 MB, no WiFi, USB-C only. ThoxAir is Pi Zero W class, 512 MB, WiFi + BT, and has magnetic pogo connectors so four ThoxAir can stack into a cluster on one USB-C cable. ThoxMini is cheaper and runs cooler; ThoxAir is more capable and clusterable.

## "Is the wake-word configurable?"

> Yes. The on-device wake-word model on ThoxClip ships with three defaults: "thox," "agent," and "computer." You can train a custom wake-word using the THOX dashboard on ThoxNova; the training data stays on-device.

