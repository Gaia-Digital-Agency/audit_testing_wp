# Manual Frontend Quality Checklist

**Project:** _________________________

**Reviewer:** _________________________

**Date:** _________________________

## HEAD

- [ ] **Favicons**: Verify that the favicons are present and display correctly across different browsers and devices (e.g., desktop browsers, iOS, Android).

  - *Notes*: ____________________________________________________
  - *Why Manual*: While you can automate checking for the *presence* of `<link>` tags for favicons, you must manually verify that the icons themselves render correctly and are not distorted or pixelated.

## HTML

- [ ] **Content Structure**: The content hierarchy and structure make sense and are logical.

  - *Notes*: ____________________________________________________
  - *Why Manual*: Automated tools can't understand the context or intent of your content. A developer needs to review the rendered page to ensure the information flows logically and the structure supports the user's journey.

## CSS

- [ ] **Visual Consistency**: The design is consistent with the provided mockups. All fonts, colors, and spacing match the design system.

  - *Notes*: ____________________________________________________
  - *Why Manual*: While visual regression testing helps, a human eye is needed for the initial implementation and for subtle checks. A developer or designer must compare the live site against the design files (e.g., in Figma or Sketch) to ensure pixel-perfect accuracy.

- [ ] **Browser Compatibility**: The website displays and functions correctly on all supported browsers (e.g., Chrome, Firefox, Safari, Edge).

  - *Notes*: ____________________________________________________
  - *Why Manual*: Despite automation, subtle rendering differences and browser-specific bugs can occur. It's crucial to manually test the site on actual devices and browsers or use services like BrowserStack for comprehensive cross-browser testing.

## IMAGES

- [ ] **Meaningful `alt` Text**: The `alt` text for images is descriptive and provides a meaningful alternative for screen reader users.

  - *Notes*: ____________________________________________________
  - *Why Manual*: An automated tool can check for the *presence* of an `alt` tag, but it cannot determine if the text is contextually appropriate or genuinely helpful. This requires human judgment.

## JAVASCRIPT

- [ ] **Functionality**: All features and user interactions work as expected (exploratory testing).

  - *Notes*: ____________________________________________________
  - *Why Manual*: While unit and E2E tests can automate checking specific functions and user flows, comprehensive manual testing is necessary to discover unexpected bugs and usability issues that automated scripts might miss.

## PERFORMANCE

- [ ] **UI/UX States**: The application handles loading, empty, and error states gracefully.

  - *Notes*: ____________________________________________________
  - *Why Manual*: You need to manually simulate conditions to check the user experience for loading states (spinners, skeletons), empty states (no search results), and error states (user-friendly API error messages).

- [ ] **Perceived Performance**: The site feels fast and responsive to the user, especially on throttled networks or less powerful devices.

  - *Notes*: ____________________________________________________
  - *Why Manual*: Metrics are important, but they don't always capture the user's subjective experience. Manually interacting with the site is the only way to truly gauge perceived performance.

## USER EXPERIENCE (UX)

- [ ] **Intuitive Navigation & Flow**: The user journey through the application is logical, simple, and free of friction.

  - *Notes*: ____________________________________________________
  - *Why Manual*: A human must assess the "feel" of the application flow. Can a new user achieve their goal without confusion? This requires a holistic, subjective review that tools cannot perform.

- [ ] **Mobile-Specific Interactions**: Touch gestures (swiping, pinching, tapping) feel natural and responsive on real mobile devices.

  - *Notes*: ____________________________________________________
  - *Why Manual*: Simulators are good, but testing on a real device is the only way to assess the responsiveness and ergonomics of touch interactions.

## CONTENT & COPY

- [ ] **Clarity and Tone of Microcopy**: All UI text (button labels, placeholders, helper text) is clear, concise, and helpful.

  - *Notes*: ____________________________________________________
  - *Why Manual*: Automated tools can't judge the clarity, tone, or helpfulness of text. A developer needs to read the copy from a user's perspective to ensure it makes sense in context.

## ACCESSIBILITY (a11y)

- [ ] **Keyboard Navigation**: The entire site is navigable and usable with only a keyboard. Focus order is logical, and all interactive elements are reachable and have a visible focus state.

  - *Notes*: ____________________________________________________
  - *Why Manual*: You must manually tab through the entire page to ensure that the focus indicator is always visible and moves in a logical sequence.

- [ ] **Screen Reader Experience**: The site is usable and makes sense when navigated with a screen reader (e.g., NVDA, VoiceOver).

  - *Notes*: ____________________________________________________
  - *Why Manual*: This is the ultimate test of accessibility. A developer must use a screen reader to ensure content is read logically and interactive elements are announced correctly.

- [ ] **Reduced Motion**: If the user has `prefers-reduced-motion` enabled, animations are disabled or significantly reduced.

  - *Notes*: ____________________________________________________
  - *Why Manual*: This requires manually changing system/browser settings and visually verifying that animations are properly suppressed to respect the user's preference.

## SEO

- [ ] **Keyword Strategy**: The content is aligned with the target keywords and user intent.

  - *Notes*: ____________________________________________________
  - *Why Manual*: SEO is not just technical; it's heavily based on content strategy. A human needs to ensure the page's content is relevant to what users are searching for.

## LEGAL & COMPLIANCE

- [ ] **Cookie Consent**: The cookie consent banner is compliant and functions correctly (non-essential cookies are blocked before consent).

  - *Notes*: ____________________________________________________
  - *Why Manual*: A manual check is needed to verify that non-essential cookies are actually blocked *before* consent is given, using browser developer tools.

- [ ] **Privacy & Terms Links**: Links to the Privacy Policy and Terms of Service are present and lead to the correct documents.

  - *Notes*: ____________________________________________________
  - *Why Manual*: A simple manual click-through is the most reliable way to ensure these critical legal links are not broken and point to the correct, up-to-date pages.