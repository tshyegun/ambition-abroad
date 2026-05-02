# Japanese Visa Matcher

_Started 2026-05-02 08:04 UTC_

---

## User

I want to create a tool for people who are wanting to know the best japanese visa options for their situation. I want this to be a tool that people can answers some key questions, and then the tool analyzes the data, and all the visa options out there for them, and then based off a scoring ranking, it provides them the best visa option for them, with an action plan/checklist for them.

This will be a lead magnet, so there needs to be at least 3 pages of design. 1 for the opt-in page to collect emails, 1 with the questionaire or data collection, and 1 page where the final output and checklist will be with information and scoring.

## Assistant

_[tool: update_todos]_

Let me explore the design system first while I ask you some questions!

_[tool: list_files]_

_[tool: questions_v2]_

## User

Questions answered:
- target_audience: All of the above
- visa_types: All major visa types
- questionnaire_length: 15
- output_detail: Top 1 visa + detailed checklist, next steps, and resources
- email_platform: They immediately proceed to the questionnaire
- cta_goal: Decide for me
- visual_style: Decide for me
- existing_mocks: Use the design system as-is — no existing pages to match
- language: Decide for me
- scoring_logic: Decide for me

## Assistant

_[tool: read_file]_

_[tool: read_file]_

Let me read the remaining UI kit files to get a full picture, then I'll build.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now I have everything I need. Let me plan the system and build it.

_[tool: update_todos]_

Let me copy the fonts and build everything now.

_[tool: copy_files]_

Now let me build the full Visa Evaluator. Here's my design reasoning:

**System design:**
- **Page 1 (Opt-in):** Dark cinematic hero with amber accent — dramatic, premium feel to create urgency. Email collected, then user proceeds.
- **Page 2 (Questionnaire):** Warm off-white, clean, 15 questions in grouped steps (3 sections × 5 questions). Progress bar. Card-based multiple choice.
- **Page 3 (Results):** Scored output using weighted algorithm across 9 visa types. Top match shown prominently with score, eligibility summary, and a full action checklist. CTA to newsletter.

**Scoring logic:** Weighted scoring — each answer contributes points to each visa type. The top scorer wins. Secondary matches shown as smaller callouts.

_[tool: write_file]_

_[tool: done]_

Let me find and fix that syntax error on line 785.

_[tool: read_file]_

Found it — the issue is `employer's` (curly apostrophe / smart quote inside a single-quoted JS string). Let me scan for all similar issues and fix them all at once.

_[tool: grep]_

Just the one. Let me fix it:

_[tool: str_replace_edit]_

Now let me also check for the `startup's` in the startup visa section and any other apostrophes in JS strings:

_[tool: grep]_

Good, no other issues. Let me also check for the `Japan's` in the digital nomad description which used a straight apostrophe inside a single-quoted string:

_[tool: grep]_

That one is fine — it's already escaped with `\'`. Now let me call done to verify:

_[tool: done]_

Clean! Let me run the verifier.

_[tool: fork_verifier_agent]_

The **Japan Visa Evaluator** is live and error-free. Here's what was built:

**3-page flow:**
1. **Opt-in page** — Dark cinematic hero (on-brand with Ambition Abroad), collects first name + email, shows social proof stats (9 visa types, 15 questions, <3 min)
2. **Questionnaire** — 15 questions across 3 grouped sections (Background → Intent → Practical), with progress bar, section intro cards, auto-advance on selection, and back/skip navigation
3. **Results page** — Weighted scoring across 9 Japanese visa types, shows: best-fit visa with match score, your profile summary, key requirements checklist, a phased action plan (interactive — tick items off), 2 runner-up alternatives, and a newsletter CTA

**Scoring engine** covers all 9 visa types: Business Manager, Highly Skilled Professional, Engineer/Humanities, Specified Skilled Worker, Digital Nomad, Startup, Investor, Spouse/Dependent, and Student.

**Next steps to consider:**
- Connect a real email platform (ConvertKit, Beehiiv, etc.) to the opt-in form
- Add your actual newsletter URL to the CTA button at the bottom of results
- The "retake" button resets everything cleanly for sharing/testing

_[tool: update_todos]_

_[tool: snip]_

It looks like your message came through empty! What would you like to change or add?

## User

I want the opt in page to be a white background now black.

## Assistant

_[tool: read_file]_

I can see the opt-in page styles. Let me update them to a light/white treatment:

_[tool: str_replace_edit]_

Now update the nav to be light on the opt-in page too:

_[tool: str_replace_edit]_

Also update the initial nav class on the nav element itself (it starts dark by default):

_[tool: str_replace_edit]_

Also need to update the nav-step label color for the light nav on this page:

_[tool: str_replace_edit]_

Wait, that replaced the wrong line. Let me fix that:

_[tool: str_replace_edit]_

Good. Now let me verify:

_[tool: done]_

Done — the opt-in page is now white/light, matching the questionnaire style. The nav also switches to the light treatment on that page. Everything else stays the same.

## User

Apply a direct edit. In Visa Evaluator.html: change the text from "Answer 15 questions. Get your best-fit Japanese visa option, a full eligibility breakdown, and a step-by-step action plan — in under 3 minutes." to "Get your best-fit Japanese visa option, a full eligibility breakdown, and a step-by-step action plan — in under 3 minutes.".
<mentioned-element>
dom:      body › div#page-optin.page.active › div.optin-inner › p.optin-subheadline.fade-up[3/6]
text:     "Answer 15 questions. Get your best-fit Japanese visa option…"
children: text
selector: [data-om-id="a6a01607:22"]
id:       cc-3
</mentioned-element>

## Assistant

_[tool: str_replace_edit]_

Done!

## User

Apply 4 direct edits:
1. In Visa Evaluator.html: set the inline style to `font-weight: 400`.
<mentioned-element>
dom:      body › div#page-results.page.active › div.results-body › div.results-cta › h2.cta-headline › em
text:     "Japan blueprint"
children: text
selector: [data-om-id="a6a01607:81"]
id:       cc-7
</mentioned-element>
2. In Visa Evaluator.html: change the text from "Japan blueprint" to " Japan blueprint".
<mentioned-element>
dom:      body › div#page-results.page.active › div.results-body › div.results-cta › h2.cta-headline › em
text:     "Japan blueprint"
children: text
selector: [data-om-id="a6a01607:81"]
id:       cc-7
</mentioned-element>
3. In Visa Evaluator.html: change the text from "Real breakdowns from founders and professionals who made the move — visas, incorporation, banking, and what no official guide tells you." to "Every week, get the real strategies, lessons, and unfiltered decisions from foreigners actually building businesses in Japan.".
<mentioned-element>
dom:      body › div#page-results.page.active › div.results-body › div.results-cta › p.cta-sub[3/6]
text:     "Real breakdowns from founders and professionals who made th…"
children: text
selector: [data-om-id="a6a01607:82"]
id:       cc-9
</mentioned-element>
4. In Visa Evaluator.html: change the text from "Based on your answers, Travis —" to "Based on your answers, Travis:".
<mentioned-element>
dom:      body › … › div.results-hero-inner › p#results-name-display.results-name-display.fade-up[2/4]
text:     "Based on your answers, Travis —"
children: text
selector: [data-om-id="a6a01607:56"]
id:       cc-11
</mentioned-element>

## Assistant

_[tool: str_replace_edit]_

Done — all 4 edits applied (the `em` font-weight, the space before "Japan blueprint", the CTA body copy, and the results name display format).

