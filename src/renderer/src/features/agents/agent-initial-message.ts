import type { FirstAgentDraft } from "@openbot/ui/features/agents/FirstAgentSetup";

const OPENING_REQUEST =
  "Greet me in one line, then give three short suggestions of what you can do for me now. Do not start the work.";

/** The standing role: the purpose the user wrote, or the name the user chose when there is none. */
function standingRole(draft: Pick<FirstAgentDraft, "name" | "purpose">): string {
  const purpose = draft.purpose.trim();
  if (purpose) return `Your ongoing role is: ${purpose}`;
  const name = draft.name.trim();
  return name ? `Your name, ${name}, gives your ongoing role.` : "";
}

/**
 * Give a newly created agent its standing role, and ask it to open with three suggestions. With no
 * purpose, the name carries the role, so an agent called "Trip planner" opens with trip suggestions
 * instead of a generic greeting. Agent prompts stay in English; the user's words do not change.
 */
export function createAgentInitialMessage(draft: Pick<FirstAgentDraft, "name" | "purpose">): string {
  const role = standingRole(draft);
  return role ? `${role}\n\n${OPENING_REQUEST}` : "Greet me briefly.";
}
