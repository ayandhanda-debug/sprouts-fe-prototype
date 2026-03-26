# Signals Discovery: One-Page Product Brief (Flow-Based)

## 1) Feature Intent
Signals Discovery is built to convert a user’s domain context into actionable account signals that can directly power outreach lists (TAL) and targeted prospecting.

## 2) Core Product Flow

### Step 1: Domain Enrichment in Messaging Settings
- User enriches domain (website + uploaded content) in Messaging settings.
- This enrichment layer is shared and reused for both:
  - HPM messaging context
  - Signals Discovery recommendations
- Output: structured understanding of offerings, use-cases, pain points, proof points, and related entities.

### Step 2: Recommended Signals Generation
- Based on enriched domain context, system recommends relevant signal categories and signal items.
- These are not generic signals; they are tailored to what the company offers and how it sells.
- Output: approved/recommended signals list for account matching.

### Step 3: Precomputed Account Results
- For recommended signals, the system shows precomputed account-level matches.
- Users can immediately see which accounts currently have those signals and their latest status/trend direction.
- These matched signals are also shown in DB Search so users can source the right accounts faster.
- Output: ready-to-use account shortlist with explainable signal context.

### Step 4: TAL Population from DB-Sourced Accounts
- Matched accounts are pushed/populated into TAL for outreach workflows.
- User can move selected DB-sourced signal accounts directly into TAL.
- Contacts for those accounts are then available for message generation.
- Output: account + contact set ready for activation.

### Step 5: Messaging Activation + Added Context
- User generates messages on selected contacts from TAL.
- User can add extra context (prompt/context inputs) before outreach.
- Same output can also be used for targeted prospecting (outside immediate outreach cadences).
- Output: faster move from discovery to personalized outreach activation.

## 3) Why This Matters
- Removes manual research before outreach.
- Aligns messaging context and signal intelligence under one enrichment source.
- Reduces time from “new domain” to “outreach-ready account list.”
- Improves trust by keeping results explainable (what signal, why matched, current status).

## 4) Prototype Scope (FE-Only)
- Show enrichment as the first dependency in user flow.
- Show recommended signals UI tied to enriched context.
- Show signals visibility in DB search for sourcing accounts.
- Show precomputed matched accounts with status/trend indicators.
- Show TAL handoff state (accounts selected from recommended signals).
- Show account-to-contact handoff for message generation flow.
- Show “add context before outreach” touchpoint in messaging flow.
- Keep clear pathway for “also use for targeted prospecting.”

## 5) DS Dependencies (Non-FE)
- Signal recommendation logic from enriched domain context.
- Precomputed account-signal matching pipeline.
- Status/trend computation payloads for matched accounts.
- Explainability payload (signal evidence + rationale).

## 6) Success Criteria
- User can enrich domain and reach recommended signals in one guided flow.
- User can identify matched accounts from recommended signals without manual filtering.
- User can source accounts from DB signals and move them to TAL in minimal steps.
- User can access relevant contacts and generate messages with added context.
- User can explain to team why these accounts were selected (signal-backed rationale).
