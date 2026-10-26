const OPENING_REQUEST =
  "Greet me in one line, then give three short suggestions of what you can do for me now. Do not start the work.";

/** The standing role: the description the user wrote, or the name the user chose when there is none. */
function standingRole(name: string, roleDescription: string): string {
  const description = roleDescription.trim();
  if (description) return `Your ongoing role is: ${description}`;
  const agentName = name.trim();
  return agentName ? `Your name, ${agentName}, gives your ongoing role.` : "";
}

/**
 * The first message of a new agent. It states the role, which the description gives, or the name
 * when the user wrote no description, so an agent called "Trip planner" opens as one. It adds the
 * first task when the user wrote one, and asks for three suggestions when the user wrote none. With
 * neither role nor task, the agent greets the user. Agent prompts stay in English; the user's words
 * do not change.
 */
export function agentInitialMessage(name: string, roleDescription: string, task = ""): string {
  const role = standingRole(name, roleDescription);
  const opening = task.trim() || (role ? OPENING_REQUEST : "");
  const parts = [role, opening].filter(Boolean);
  return parts.length > 0 ? parts.join("\n\n") : "Greet me briefly.";
}
