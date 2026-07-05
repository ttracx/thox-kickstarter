"use strict";

/**
 * Structured, compliance-clean content for the six Thox.ai campaign documents.
 *
 * Every string here is written to pass config/brand_guardrails.yaml. The
 * internal runbook describes the guardrails by category rather than spelling
 * out the banned tokens, and refers to the contract manufacturer generically,
 * so that even the internal document clears the same conservative bar. The
 * literal supplier name lives only in the separate internal supplier record,
 * not in any generated file.
 *
 * The layout leans on the renderer's design blocks (hero band, stat tiles,
 * feature cards, pull quotes, section banners) so the documents read as
 * polished campaign collateral while staying inside the brand guardrails.
 *
 * Exports an array of { file, spec } objects.
 */

// Small block builders to keep the content readable.
const h1 = (text) => ({ type: "h1", text });
const h2 = (text) => ({ type: "h2", text });
const h3 = (text) => ({ type: "h3", text });
const kicker = (text) => ({ type: "kicker", text });
const p = (text) => ({ type: "p", text });
const lead = (text) => ({ type: "lead", text });
const bullets = (items) => ({ type: "bullets", items });
const numbers = (items) => ({ type: "numbers", items });
const table = (header, rows, widths) => ({ type: "table", header, rows, widths });
const rule = () => ({ type: "rule" });
const callout = (text) => ({ type: "callout", text });
const quote = (text, attribution) => ({ type: "quote", text, attribution });
const banner = (text, tone) => ({ type: "banner", text, tone });
const stats = (items) => ({ type: "stats", items });
const cards = (items, columns) => ({ type: "cards", items, columns });
const spacer = () => ({ type: "spacer" });
const pagebreak = () => ({ type: "pagebreak" });

// The five-device family, described once and reused as feature cards.
const FAMILY_CARDS = [
  {
    tag: "Flagship",
    title: "ThoxNova",
    body: "The flagship privacy-first edge AI device. Runs ThoxOS, couples with MagStack, and clusters up to 8 devices.",
  },
  {
    tag: "Companion",
    title: "ThoxClip",
    body: "A phone-attached, vertically flush companion running ThoxOS Clip Edition over a USB-C PowerBridge. Engineering preview.",
  },
  {
    tag: "Compute stick",
    title: "ThoxMini",
    body: "A USB-C private Linux compute stick that plugs into any USB-C host.",
  },
  {
    tag: "Pocket node",
    title: "ThoxAir",
    body: "The thinnest always-carry pocket node, new for this campaign.",
  },
  {
    tag: "Appliance",
    title: "ThoxOnStick",
    body: "A bootable ThoxOS environment appliance that runs a self-contained ThoxOS desktop on a host machine.",
  },
];

// ----------------------------------------------------------------------- //
// 1. Campaign story
// ----------------------------------------------------------------------- //
const campaignStory = {
  file: "campaign-story.docx",
  spec: {
    title: "Own Your AI",
    subtitle: "Privacy-first edge AI, from the live Founder Reservation to the Kickstarter.",
    eyebrow: "Campaign Story",
    kind: "public",
    blocks: [
      lead(
        "Thox.ai builds privacy-first edge AI hardware and the ThoxOS operating system. You get capable on-device AI that you control, with a clear path to grow from a single device to a small private cluster."
      ),
      stats([
        { value: "5", label: "Devices in the family" },
        { value: "8", label: "Cluster up to" },
        { value: "Q4 2026", label: "Estimated shipping" },
        { value: "629 USD", label: "Super early bird" },
      ]),
      h2("The problem"),
      p(
        "Most AI today runs on someone else's servers. Your prompts, your files, and your context leave your hands the moment you ask a question. For people who care about privacy, that is a poor trade. You should not have to send your life to the cloud to get useful AI."
      ),
      h2("Our solution"),
      p(
        "With Thox.ai, data stays on your devices. ThoxOS runs capable models on hardware you own, and MeshStack links your devices into a private mesh so they work together without handing your context to anyone else."
      ),
      callout("Data stays on your devices. Manufactured by Thox.ai LLC."),
      banner("Meet the family"),
      p("The lineup is five devices, each with a clear job."),
      cards(FAMILY_CARDS, 2),
      h2("How the devices work together"),
      p(
        "ThoxNova devices couple with MagStack and cluster up to 8 units, so you can start with one and grow into a small private cluster as your needs grow."
      ),
      p(
        "MeshStack is the software layer that links your devices into a private mesh. It uses the WireGuard protocol, works offline on LAN after pairing, and the coordinator never sees plaintext. There are apps for iOS, Android, macOS, and Windows."
      ),
      h2("Colorways"),
      p("ThoxNova is available in Matte Black, Space Gray, and Arctic White."),
      h2("Who we are"),
      cards(
        [
          {
            tag: "CEO",
            title: "Craig Ross",
            body: "Leads positioning, partnerships, and how Thox.ai shows up in the world.",
          },
          {
            tag: "CTO",
            title: "Tommy Xaypanya",
            body: "Leads hardware, ThoxOS, and MeshStack, and keeps your data on your devices.",
          },
        ],
        2
      ),
      p(
        "Thox.ai LLC builds hardware and software for people who want their AI to stay close to home. Every device is manufactured by Thox.ai LLC. We hold the conservative line on what we claim, and we would rather under-promise and ship than overstate what the hardware does."
      ),
      pagebreak(),
      banner("The ask"),
      h2("Phase one: the Founder Reservation, live now"),
      p(
        "The Founder Reservation is open today for ThoxNova. It is a reservation, not a final sale. Your deposit is fully refundable and is credited toward your purchase. Payments are handled by Stripe. Estimated shipping is Q4 2026."
      ),
      table(
        ["Reservation tier", "Refundable deposit", "What it holds"],
        [
          ["Single", "99.99 USD", "One ThoxNova"],
          ["Duo", "249.00 USD", "Two ThoxNova devices, MagStack ready"],
          ["Quad", "499.00 USD", "Four ThoxNova devices"],
          ["Octuple", "999.00 USD", "Eight ThoxNova devices, a full cluster"],
        ],
        [3120, 2520, 3720]
      ),
      h2("Phase two: the Kickstarter"),
      p(
        "Next comes the Kickstarter, which carries all five devices. Founder Reservation holders are treated as day-one backers."
      ),
      stats([
        { value: "75,000 USD", label: "Funding goal" },
        { value: "30 days", label: "All or nothing" },
        { value: "Day one", label: "Reservation holders" },
      ]),
      h2("MeshStack for founders"),
      p(
        "Founders get 12 months of MeshStack Pro included, then a 9 USD per month Founder rate for life. Founder annual pre-orders are available at 99 per year for Pro, 249 per year for Family, and 599 per seat per year for Team."
      ),
      callout("Reserve now, grow later. Start with one ThoxNova and scale to a cluster when you are ready."),
    ],
  },
};

// ----------------------------------------------------------------------- //
// 2. FAQ
// ----------------------------------------------------------------------- //
const faq = {
  file: "faq.docx",
  spec: {
    title: "Questions, Answered",
    subtitle: "Privacy, devices, ownership, and delivery.",
    eyebrow: "Frequently Asked",
    kind: "public",
    blocks: [
      lead("The short answers to what people ask most about Thox.ai, the family, and the Founder Reservation."),
      stats([
        { value: "Refundable", label: "Founder deposit" },
        { value: "Q4 2026", label: "Estimated shipping" },
        { value: "On device", label: "Your data stays" },
        { value: "5", label: "Devices to choose" },
      ]),
      h3("How does Thox.ai protect my privacy?"),
      p("Data stays on your devices. MeshStack uses the WireGuard protocol, works offline on LAN after pairing, and the coordinator never sees plaintext."),
      h3("How do the devices work together?"),
      p("ThoxNova devices couple with MagStack and cluster up to 8 units. MeshStack links them into a private mesh with apps for iOS, Android, macOS, and Windows."),
      h3("Do I need an internet connection?"),
      p("After pairing, MeshStack works offline on LAN. An internet connection is helpful for updates and remote links, but your day-to-day use does not depend on the cloud."),
      h3("Which device should I choose?"),
      p("Start with ThoxNova if you want the flagship experience. Choose ThoxMini for a USB-C private Linux compute stick, ThoxAir for the thinnest always-carry node, ThoxClip for a phone-attached companion, or ThoxOnStick to boot a ThoxOS desktop on a host machine."),
      h3("Can I start small and grow?"),
      p("Yes. Begin with a single ThoxNova and add more over time. MagStack coupling lets you grow into a cluster of up to 8 devices."),
      h3("Do I own the device and my data?"),
      p("Yes. You own the hardware, and data stays on your devices."),
      h3("What do the models do, at a high level?"),
      p("Each device runs on-device AI through ThoxOS so you can work with capable models without sending your context to someone else's servers."),
      h3("What colorways are available?"),
      p("ThoxNova comes in Matte Black, Space Gray, and Arctic White."),
      h3("When will my device ship?"),
      p("Estimated shipping is Q4 2026 for the Founder Reservation, with later Kickstarter waves following in sequence."),
      h3("Who manufactures Thox.ai devices?"),
      p("Every device is manufactured by Thox.ai LLC."),
      h3("Is my deposit refundable?"),
      p("Yes. The Founder Reservation deposit is fully refundable and is credited toward your purchase. It is a reservation, not a final sale. Payments are handled by Stripe."),
      h3("How do I get support?"),
      p("Reach the team through the contact channels listed on the campaign page. Founders get priority onboarding."),
    ],
  },
};

// ----------------------------------------------------------------------- //
// 3. Email sequences
// ----------------------------------------------------------------------- //
const emailRow = (subject, preview, body) => [subject, preview, body];
const EMAIL_WIDTHS = [2600, 2200, 4560];

const emailSequences = {
  file: "email-sequences.docx",
  spec: {
    title: "Email Sequences",
    subtitle: "Pre-launch, launch day, nurture, final hours, and onboarding.",
    eyebrow: "Lifecycle Email",
    kind: "public",
    blocks: [
      lead("Eleven emails carry a subscriber from first tease to a paired device. Every line is written to clear the compliance gate."),
      stats([
        { value: "3", label: "Pre-launch" },
        { value: "1", label: "Launch day" },
        { value: "3", label: "Nurture" },
        { value: "2", label: "Final hours" },
        { value: "2", label: "Onboarding" },
      ]),
      h2("Pre-launch"),
      table(
        ["Subject", "Preview", "Body"],
        [
          emailRow(
            "Privacy-first edge AI is almost here",
            "Reserve your ThoxNova soon",
            "Thox.ai is opening Founder Reservations for ThoxNova. Data stays on your devices. Watch for the open date."
          ),
          emailRow(
            "Meet the Thox.ai family",
            "Five devices, one private mesh",
            "ThoxNova, ThoxClip, ThoxMini, ThoxAir, and ThoxOnStick work together through MeshStack, which works offline on LAN after pairing."
          ),
          emailRow(
            "How clustering works",
            "Start with one, grow to eight",
            "ThoxNova couples with MagStack and clusters up to 8 devices. Begin with a single device and scale when you are ready."
          ),
        ],
        EMAIL_WIDTHS
      ),
      h2("Launch day"),
      table(
        ["Subject", "Preview", "Body"],
        [
          emailRow(
            "Founder Reservations are open",
            "Refundable deposit, credited toward purchase",
            "Reserve your ThoxNova now. Your deposit is fully refundable and credited toward purchase. Estimated shipping is Q4 2026. Payments handled by Stripe."
          ),
        ],
        EMAIL_WIDTHS
      ),
      h2("Mid-campaign nurture"),
      table(
        ["Subject", "Preview", "Body"],
        [
          emailRow(
            "Your data, your devices",
            "Why on-device matters",
            "With Thox.ai, data stays on your devices. MeshStack uses the WireGuard protocol and the coordinator never sees plaintext."
          ),
          emailRow(
            "Pick the device that fits",
            "From pocket node to compute stick",
            "ThoxAir is the thinnest always-carry node, ThoxMini is a USB-C private Linux compute stick, and ThoxOnStick boots a ThoxOS desktop on a host machine."
          ),
          emailRow(
            "MeshStack for founders",
            "12 months of Pro included",
            "Founders get 12 months of MeshStack Pro included, then a 9 USD per month Founder rate for life."
          ),
        ],
        EMAIL_WIDTHS
      ),
      h2("Final 48 hours"),
      table(
        ["Subject", "Preview", "Body"],
        [
          emailRow(
            "48 hours left to reserve",
            "Lock your founder pricing",
            "The Founder Reservation window is closing. Reserve your ThoxNova to hold your place for the Kickstarter as a day-one backer."
          ),
          emailRow(
            "Last call for the Founder Reservation",
            "Refundable, credited toward purchase",
            "This is the final call. Your deposit is fully refundable and credited toward purchase. Estimated shipping is Q4 2026."
          ),
        ],
        EMAIL_WIDTHS
      ),
      h2("Post-campaign onboarding"),
      table(
        ["Subject", "Preview", "Body"],
        [
          emailRow(
            "Welcome to Thox.ai",
            "Here is what happens next",
            "Thank you for reserving your ThoxNova. We will keep you posted on production and fulfillment. Every device is manufactured by Thox.ai LLC."
          ),
          emailRow(
            "Set up MeshStack",
            "Your private mesh, step by step",
            "When your device arrives, pair it and MeshStack works offline on LAN. Apps are available for iOS, Android, macOS, and Windows."
          ),
        ],
        EMAIL_WIDTHS
      ),
    ],
  },
};

// ----------------------------------------------------------------------- //
// 4. Social media calendar
// ----------------------------------------------------------------------- //
const socialRow = (day, platform, theme, hook) => [day, platform, theme, hook];
const SOCIAL_WIDTHS = [1400, 1700, 2600, 3660];

const socialCalendar = {
  file: "social-media-calendar.docx",
  spec: {
    title: "Social Media Calendar",
    subtitle: "A pre-launch runway plus a 30-day live plan.",
    eyebrow: "30-Day Plan",
    kind: "public",
    blocks: [
      lead("A platform-by-platform rhythm that carries the story from the first teaser to the final call, one hook at a time."),
      stats([
        { value: "T-14", label: "Runway starts" },
        { value: "30", label: "Days live" },
        { value: "4", label: "Platforms" },
        { value: "5", label: "Devices featured" },
      ]),
      h2("Pre-launch runway"),
      table(
        ["Day", "Platform", "Theme", "Hook"],
        [
          socialRow("T-14", "X", "Teaser", "Privacy-first edge AI is coming. Data stays on your devices."),
          socialRow("T-10", "LinkedIn", "Founders", "Meet Craig Ross and Tommy Xaypanya, building Thox.ai."),
          socialRow("T-7", "Mastodon", "Family", "Five devices, one private mesh. Here is the lineup."),
          socialRow("T-3", "X", "Countdown", "Founder Reservations open in three days."),
        ],
        SOCIAL_WIDTHS
      ),
      h2("Week 1"),
      table(
        ["Day", "Platform", "Theme", "Hook"],
        [
          socialRow("Day 1", "X", "Launch", "Founder Reservations are open. Refundable deposit, credited toward purchase."),
          socialRow("Day 2", "LinkedIn", "Why on-device", "Your prompts should not leave your hands. Data stays on your devices."),
          socialRow("Day 3", "Mastodon", "ThoxNova", "The flagship privacy-first edge AI device, in three colorways."),
          socialRow("Day 5", "X", "Clustering", "Start with one ThoxNova, grow to eight with MagStack."),
          socialRow("Day 7", "LinkedIn", "MeshStack", "A private mesh that works offline on LAN after pairing."),
        ],
        SOCIAL_WIDTHS
      ),
      h2("Week 2"),
      table(
        ["Day", "Platform", "Theme", "Hook"],
        [
          socialRow("Day 9", "X", "ThoxMini", "A USB-C private Linux compute stick for any host."),
          socialRow("Day 11", "Mastodon", "ThoxAir", "The thinnest always-carry pocket node."),
          socialRow("Day 12", "LinkedIn", "ThoxOnStick", "Boot a self-contained ThoxOS desktop on a host machine."),
          socialRow("Day 14", "X", "Colorways", "Matte Black, Space Gray, Arctic White."),
        ],
        SOCIAL_WIDTHS
      ),
      h2("Week 3"),
      table(
        ["Day", "Platform", "Theme", "Hook"],
        [
          socialRow("Day 16", "LinkedIn", "Ownership", "You own the hardware, and data stays on your devices."),
          socialRow("Day 18", "X", "ThoxClip", "A phone-attached companion running ThoxOS Clip Edition."),
          socialRow("Day 21", "Mastodon", "Founder special", "12 months of MeshStack Pro included for founders."),
        ],
        SOCIAL_WIDTHS
      ),
      h2("Week 4"),
      table(
        ["Day", "Platform", "Theme", "Hook"],
        [
          socialRow("Day 23", "X", "Day-one backers", "Reserve now and join the Kickstarter as a day-one backer."),
          socialRow("Day 26", "LinkedIn", "Delivery", "Estimated shipping is Q4 2026."),
          socialRow("Day 28", "Mastodon", "Recap", "Five devices, one private mesh, your data on your devices."),
          socialRow("Day 30", "X", "Final call", "Last day for the Founder Reservation."),
        ],
        SOCIAL_WIDTHS
      ),
    ],
  },
};

// ----------------------------------------------------------------------- //
// 5. Press release
// ----------------------------------------------------------------------- //
const pressRelease = {
  file: "press-release.docx",
  spec: {
    title: "Thox.ai Opens Founder Reservations",
    subtitle: "Privacy-first edge AI you own, starting with ThoxNova.",
    eyebrow: "For Immediate Release",
    kind: "public",
    blocks: [
      lead(
        "Thox.ai LLC today opened Founder Reservations for ThoxNova, the flagship device in a five-device family of privacy-first edge AI hardware that runs the ThoxOS operating system. With Thox.ai, data stays on your devices."
      ),
      stats([
        { value: "629 USD", label: "Super early bird" },
        { value: "899 USD", label: "MSRP" },
        { value: "Q4 2026", label: "Estimated shipping" },
        { value: "5", label: "Devices in the family" },
      ]),
      banner("The lineup"),
      cards(FAMILY_CARDS, 2),
      h2("Availability and pricing"),
      p(
        "The Founder Reservation is live now with a fully refundable deposit credited toward purchase. ThoxNova is priced from 629 USD at super early bird up to a 899 USD MSRP. Estimated shipping is Q4 2026. A Kickstarter carrying all five devices follows as the next phase."
      ),
      h2("From the founders"),
      quote(
        "People should not have to send their lives to the cloud to use AI. Thox.ai keeps your data on your devices.",
        "Craig Ross, CEO"
      ),
      quote(
        "We built ThoxOS and MeshStack so your devices work together privately, offline on LAN after pairing, with the coordinator never seeing plaintext.",
        "Tommy Xaypanya, CTO"
      ),
      h2("About Thox.ai"),
      p(
        "Thox.ai LLC builds privacy-first edge AI hardware and the ThoxOS operating system. The company was founded by Craig Ross and Tommy Xaypanya. Every device is manufactured by Thox.ai LLC."
      ),
      h2("Media contact"),
      p("For interviews and assets, contact the Thox.ai media team through the contact channels listed on the campaign page."),
    ],
  },
};

// ----------------------------------------------------------------------- //
// 6. Kickstarter runbook (internal)
// ----------------------------------------------------------------------- //
const runbook = {
  file: "kickstarter-runbook.docx",
  spec: {
    title: "Kickstarter Runbook",
    subtitle: "The internal operations playbook for the campaign team.",
    eyebrow: "Internal Playbook",
    kind: "internal",
    blocks: [
      lead(
        "The operating guide for the Thox.ai Founder Reservation and Kickstarter. For the team only. Public copy is produced separately and must pass the deterministic compliance gate before release."
      ),
      stats([
        { value: "30 days", label: "Kickstarter window" },
        { value: "75,000 USD", label: "Funding goal" },
        { value: "4", label: "Fulfillment waves" },
        { value: "6", label: "Agents on the team" },
      ]),
      h2("Roles"),
      bullets([
        "Craig Ross, CEO: owns positioning, partnerships, and final approvals.",
        "Tommy Xaypanya, CTO: owns hardware, ThoxOS, MeshStack, and technical claims review.",
        "Agent team: campaign manager, content writer, compliance guardian, social scheduler, email sequencer, and analytics.",
        "Sadie: the openly synthetic digital-human interface in ThoxOS. Sadie is a platform interface only. She is never a founder, equity holder, or spokesperson of record, and never appears in founder, investor, or legal content.",
      ]),
      h2("Pre-launch checklist"),
      numbers([
        "Confirm ThoxNova reservation tiers and Stripe configuration.",
        "Lock the campaign page copy through the compliance gate.",
        "Prepare email sequences and the social calendar.",
        "Brief the founders on quotes and interview lines.",
        "Stage the day-one backer list from the Founder Reservation.",
      ]),
      h2("Launch day"),
      numbers([
        "Open Founder Reservations and verify the Stripe flow end to end.",
        "Publish the launch-day email and the Day 1 social posts.",
        "Monitor for questions and route them to the right owner.",
        "Track reservations against the day-one target.",
      ]),
      h2("Daily operations"),
      numbers([
        "Review reservation and backer numbers each morning.",
        "Publish the scheduled social posts and any nurture email due that day.",
        "Run new public copy through the compliance gate before posting.",
        "Log issues in the risk register and escalate blockers.",
      ]),
      h2("Agent team SOP"),
      table(
        ["Agent", "Responsibility", "Gate"],
        [
          ["campaign_manager", "Owns the brief and sequencing", "Sets direction"],
          ["content_writer", "Drafts all public copy", "Output is gated"],
          ["compliance_guardian", "Explains the gate verdict", "Reviews"],
          ["social_scheduler", "Builds the social calendar", "From cleared copy"],
          ["email_sequencer", "Builds email sequences", "From cleared copy"],
          ["analytics", "Reports and recommends", "Read only"],
        ],
        [2400, 4360, 2600]
      ),
      pagebreak(),
      banner("Hard guardrails, by category"),
      p("Public copy is held to a conservative line. The compliance gate blocks any of the following, described here by category so this document itself stays clean:"),
      bullets([
        "Processor and module part names from component suppliers.",
        "Performance figures stated as a digits-plus-TOPS rating.",
        "Internal algorithm code names.",
        "Regulatory compliance claims for named privacy or export frameworks.",
        "Unverified legal-status, absolute-security, and similar marketing claims.",
        "Certification marks the company does not hold.",
        "Retired colorway names. Approved colorways are Matte Black, Space Gray, and Arctic White.",
        "Supplier and inactive-partner names. Public copy says manufactured by Thox.ai LLC.",
        "City or state in any output.",
        "Out-of-scope SKUs, accessories, and any unlisted product tiers.",
        "Em dash and emoji anywhere.",
      ]),
      callout("The contract manufacturer is recorded in the internal supplier record, not in any generated document. Public copy always says manufactured by Thox.ai LLC."),
      h2("Stretch goal ladder"),
      table(
        ["Threshold", "Title", "What it unlocks"],
        [
          ["100000 USD", "Extended colorway run", "Lock the full colorway lineup into the first wave."],
          ["150000 USD", "ThoxAir tooling", "Fund dedicated tooling for the ThoxAir pocket node."],
          ["225000 USD", "ThoxOnStick expansion", "Expand ThoxOnStick host compatibility testing."],
          ["300000 USD", "MeshStack acceleration", "Accelerate MeshStack roadmap features for all backers."],
        ],
        [2400, 3000, 3960]
      ),
      h2("Fulfillment waves"),
      table(
        ["Wave", "Scope", "Target"],
        [
          ["Wave 1, Founder", "Founder Reservation backers and Nova Single", "Q4 2026"],
          ["Wave 2, Cluster", "Nova Duo and Nova Quad", "Q1 2027"],
          ["Wave 3, Family", "Family Kit and ThoxClip preview", "Q2 2027"],
          ["Wave 4, Expansion", "ThoxMini, ThoxAir, ThoxOnStick", "Q3 2027"],
        ],
        [2600, 4400, 2360]
      ),
      h2("Risk register"),
      table(
        ["Risk", "Mitigation"],
        [
          ["Compliance slip in public copy", "Run every draft through the deterministic gate before release."],
          ["Supply timing on net-new SKUs", "Sequence ThoxAir and ThoxOnStick into later fulfillment waves."],
          ["Reservation-to-backer drop-off", "Treat reservation holders as day-one backers and keep them informed."],
          ["Pricing not yet signed off", "Hold non-Nova prices as working figures and keep them out of public copy."],
        ],
        [3680, 5680]
      ),
      h2("Definition of done"),
      bullets([
        "All public copy has passed the compliance gate.",
        "Founder Reservation is live with a verified Stripe flow.",
        "Email sequences and social calendar are scheduled.",
        "Day-one backer list is staged for the Kickstarter.",
        "Risk register is current and owned.",
      ]),
    ],
  },
};

module.exports = [
  campaignStory,
  faq,
  emailSequences,
  socialCalendar,
  pressRelease,
  runbook,
];
