# FoundAi frontend prototype

FoundAi is a React 19 + TypeScript + Vite application containing:

- The existing public company website at `/`
- A local product prototype at `/app`
- Product routes for Team, Playbook, Projects, project workspaces, and Settings

## Local setup

The Figma Make development server is started automatically. For a standalone
checkout:

```bash
pnpm install
pnpm dev
```

Create a production bundle with:

```bash
pnpm build
```

## Prototype workflow

The focused prototype flow is:

1. Create a company or choose the clearly labeled fictional example.
2. Add working instructions and reference metadata to Alex’s Playbook.
3. Create a landing-page project from a structured brief.
4. Generate a deterministic, template-based HTML example.
5. Inspect the sandboxed preview, escaped source, or saved versions.
6. Apply one supported simulated revision: blue accent, coral accent, or a
   contact section.
7. Approve the selected version.

The development build also includes a **Simulate failure** control for testing
recovery. Generation is intentionally delayed by local timers so progress and
cancellation states can be exercised. It does not call an AI model, run
generated code in the host page, publish a website, or contact a backend.

## Storage and uploads

Prototype data uses the versioned `foundai-prototype-v1` localStorage record.
It includes company details, playbook instructions, project briefs, activity,
and generated HTML versions. Invalid or unavailable storage falls back safely,
and a run that was active during refresh is marked `interrupted`.

Text references may retain a short local text preview. Other uploads retain
only name, size, and MIME type. Large binary file contents are not stored.
Settings includes a confirmed reset action that removes all local prototype
data.

## Backend boundary

`src/product/services/productService.ts` defines the typed `ProductService`
interface. Presentation and state code use its operations for:

- Creating and updating projects
- Starting runs and revisions
- Subscribing to run updates
- Canceling active work
- Approving versions
- Retrieving artifacts

`LocalMockProductService` is the current adapter. Replace that adapter when
connecting the backend and agent pipeline; keep provider credentials and
provider-specific prompting out of the frontend.
