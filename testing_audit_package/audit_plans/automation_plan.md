# Frontend Development Quality Checklist

This checklist categorizes tasks into those that can be automated and those that require manual verification by a developer.

## Head

### Automated

*   **Doctype**: The page has the correct Doctype: `<!DOCTYPE html>`.
    *   **How**: Use an HTML linter like HTMLHint or a static analysis tool integrated into your CI/CD pipeline to enforce the presence of the doctype on all HTML files.
*   **Charset**: The charset meta tag (`<meta charset="utf-8">`) is declared correctly.
    *   **How**: HTML linters can easily check for the presence and correctness of this meta tag.
*   **Viewport**: The viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1">`) is present.
    *   **How**: An HTML linter rule can ensure this tag exists in the `<head>` of your documents.
*   **Title**: A `<title>` tag is present and its length is within a reasonable limit (e.g., under 65 characters).
    *   **How**: Tools like Google Lighthouse, axe, or other SEO audit tools can automatically check for the presence of a document title. You can also write a custom linter rule to check its length.
*   **Description**: A `<meta name="description">` tag is present and its length is within SEO-friendly limits (e.g., under 155 characters).
    *   **How**: SEO audit tools and linters can be configured to check for the presence and length of the meta description.
*   **Apple Web App Meta**: Apple-specific meta tags for web apps are present if required.
    *   **How**: Use an HTML linter with custom rules to check for the presence of tags like `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style` if your project requires them.
*   **Social Meta**: Open Graph (OG) and Twitter Card meta tags are present and correctly configured.
    *   **How**: Use online validation tools like the Facebook Sharing Debugger or Twitter Card Validator within a CI step. You can also use linters to check for the presence of required tags (`og:title`, `og:image`, etc.).

### Manual

*   **Favicons**: Verify that the favicons are present and display correctly across different browsers and devices (e.g., desktop browsers, iOS, Android).
    *   **Why Manual**: While you can automate checking for the *presence* of `<link>` tags for favicons, you must manually verify that the icons themselves render correctly and are not distorted or pixelated.

## HTML

### Automated

*   **HTML5 Semantic Elements**: The page uses appropriate HTML5 semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).
    *   **How**: Linters like ESLint with accessibility plugins (for JSX) can suggest semantic alternatives to generic `<div>` elements. Static analysis tools can flag pages with a low ratio of semantic tags.
*   **Error Pages**: Custom 404 and 5xx error pages exist.
    *   **How**: Write integration or end-to-end (E2E) tests using frameworks like Cypress or Playwright that intentionally navigate to a non-existent page and verify that the custom 404 page is rendered, not the server's default.
*   **W3C Validity**: The HTML code is valid according to W3C standards.
    *   **How**: Integrate the W3C HTML Validator into your CI/CD pipeline using tools like `html-validator-cli`.
*   **Links**: All links are not broken.
    *   **How**: Use a link checker tool like `broken-link-checker` in your CI pipeline to crawl your site and report any broken (4xx or 5xx) links.

### Manual

*   **Content Structure**: The content hierarchy and structure make sense and are logical.
    *   **Why Manual**: Automated tools can't understand the context or intent of your content. A developer needs to review the rendered page to ensure the information flows logically and the structure supports the user's journey.

## CSS

### Automated

*   **Responsive Design**: The layout works on various screen sizes (mobile, tablet, desktop).
    *   **How**: Use visual regression testing tools like Percy or Applitools. These tools take screenshots of your components or pages at different breakpoints and compare them against a baseline to catch unintended visual changes.
*   **CSS Linting**: The CSS/Sass/Less code follows the project's style guide and is free of errors.
    *   **How**: Use a linter like Stylelint to enforce coding standards, prevent errors, and maintain a consistent style. Integrate it as a pre-commit hook and in your CI pipeline.
*   **Prefixing**: CSS is prefixed for required browser support.
    *   **How**: Use Autoprefixer in your build process. It automatically adds vendor prefixes to CSS rules based on data from Can I Use.
*   **Concatenation & Minification**: CSS files are concatenated and minified for production.
    *   **How**: This is a standard feature in modern build tools like Vite, Webpack, or Parcel. Configure your production build to handle this automatically.

### Manual

*   **Visual Consistency**: The design is consistent with the provided mockups. All fonts, colors, and spacing match the design system.
    *   **Why Manual**: While visual regression testing helps, a human eye is needed for the initial implementation and for subtle checks. A developer or designer must compare the live site against the design files (e.g., in Figma or Sketch) to ensure pixel-perfect accuracy.
*   **Browser Compatibility**: The website displays and functions correctly on all supported browsers (e.g., Chrome, Firefox, Safari, Edge).
    *   **Why Manual**: Despite automation, subtle rendering differences and browser-specific bugs can occur. It's crucial to manually test the site on actual devices and browsers or use services like BrowserStack for comprehensive cross-browser testing.

## Images

### Automated

*   **Image Optimization**: Images are compressed to reduce file size without significant quality loss.
    *   **How**: Integrate image optimization tools like `imagemin` into your build process. For user-uploaded content, use a service that provides on-the-fly image optimization and transformation.
*   **Image Format**: Images use modern, efficient formats like WebP where supported.
    *   **How**: Your build process or a Content Delivery Network (CDN) can be configured to automatically convert images to WebP and serve them to compatible browsers using the `<picture>` element or `Accept` headers.
*   **`alt` Attributes**: All `<img>` tags have an `alt` attribute.
    *   **How**: HTML linters and accessibility checkers like `axe` will flag any `<img>` tags missing an `alt` attribute.

### Manual

*   **Meaningful `alt` Text**: The `alt` text for images is descriptive and provides a meaningful alternative for screen reader users.
    *   **Why Manual**: An automated tool can check for the *presence* of an `alt` tag, but it cannot determine if the text is contextually appropriate or genuinely helpful. This requires human judgment.

## JavaScript

### Automated

*   **JS Linting**: The JavaScript code follows the project's style guide and is free of common errors.
    *   **How**: Use a linter like ESLint with a standard configuration (like Airbnb or Standard) and integrate it into your IDE, pre-commit hooks, and CI pipeline.
*   **Concatenation & Minification**: JavaScript files are concatenated and minified for production.
    *   **How**: This is a standard feature in modern bundlers like Vite, Webpack, or Rollup.
*   **No Console Logs**: There are no `console.log` or `debugger` statements in the production code.
    *   **How**: Configure your build tool to automatically remove these statements during the production build. ESLint can also be configured to warn or error when these are found.

### Manual

*   **Functionality**: All features and user interactions work as expected.
    *   **Why Manual**: While unit and E2E tests can automate checking specific functions and user flows, comprehensive manual testing (exploratory testing) is necessary to discover unexpected bugs and usability issues that automated scripts might miss.

## Performance

### Automated

*   **Page Weight**: The total size of the page is within the project's budget (e.g., < 500KB).
    *   **How**: Use tools like `bundlesize` or Lighthouse CI in your CI pipeline to fail builds that exceed the defined performance budget.
*   **Minification**: HTML, CSS, and JS are minified.
    *   **How**: This is handled by your build tool (Vite, Webpack, etc.) for production builds.
*   **Lazy Loading**: Images and other offscreen or non-critical assets are lazy-loaded.
    *   **How**: Lighthouse can detect images that are below the fold and are not being lazy-loaded. E2E tests can also verify that certain assets are only loaded after a specific user interaction.
*   **Core Web Vitals**: The page meets Google's Core Web Vitals thresholds (LCP, FID/INP, CLS).
    *   **How**: Run Google Lighthouse as part of your CI pipeline to track these metrics over time. You can also use Real User Monitoring (RUM) tools to gather data from actual users.

### Manual

*   **Perceived Performance**: The site feels fast and responsive to the user.
    *   **Why Manual**: Metrics are important, but they don't always capture the user's subjective experience. Manually interacting with the site, especially on a throttled network or less powerful device, is the only way to truly gauge perceived performance.

## Accessibility (a11y)

### Automated

*   **Basic Checks**: The page is checked for basic accessibility issues.
    *   **How**: Use tools like `axe` or WAVE. These can be run in the browser during development, or integrated into your E2E tests (e.g., `cypress-axe`) to automatically catch issues like color contrast errors, missing form labels, and improper ARIA usage.
*   **Heading Hierarchy**: Headings (`<h1>` - `<h6>`) follow a logical order.
    *   **How**: Accessibility checkers like `axe` will flag pages where the heading hierarchy is skipped (e.g., an `<h3>` directly after an `<h1>`).

### Manual

*   **Keyboard Navigation**: The entire site is navigable and usable with only a keyboard. Focus order is logical, and all interactive elements are reachable.
    *   **Why Manual**: You must manually tab through the entire page to ensure that the focus indicator is always visible and moves in a logical sequence. Automated tools cannot fully replicate this user interaction.
*   **Screen Reader Experience**: The site is usable and makes sense when navigated with a screen reader (e.g., NVDA, VoiceOver).
    *   **Why Manual**: This is the ultimate test of accessibility. A developer must use a screen reader to navigate the site to ensure that all content is read out logically, interactive elements are announced correctly, and the experience is not confusing for visually impaired users.

## SEO

### Automated

*   **`robots.txt`**: A `robots.txt` file is present and correctly configured.
    *   **How**: Write a simple test to ensure the `/robots.txt` file is served and its contents are as expected. Check that it doesn't disallow important parts of your site.
*   **`sitemap.xml`**: A `sitemap.xml` file is present and valid.
    *   **How**: Most frameworks and static site generators can create a sitemap automatically. You can add a CI step to validate the generated XML and check for its presence.
*   **Structured Data**: Structured data (like Schema.org) is valid.
    *   **How**: Use Google's Rich Results Test or the Schema Markup Validator via their APIs or manual checks to validate your structured data.

### Manual

*   **Keyword Strategy**: The content is aligned with the target keywords and user intent.
    *   **Why Manual**: SEO is not just technical; it's heavily based on content strategy. A human needs to ensure the page's content, titles, and headings are relevant to what users are searching for. Automated tools cannot assess content quality or strategic alignment.