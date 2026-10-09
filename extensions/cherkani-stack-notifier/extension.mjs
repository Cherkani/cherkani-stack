import * as vscode from "vscode";
import { homedir } from "node:os";
import { join } from "node:path";
import { existsSync, readFileSync } from "node:fs";

export function activate(context) {
  const configured = vscode.workspace.getConfiguration("cherkaniStack").get("sharedHome");
  const sharedHome = configured || join(homedir(), ".codex_shared");
  const events = join(sharedHome, "cherkani-stack", "events");
  const pattern = new vscode.RelativePattern(events, "*.json");
  const watcher = vscode.workspace.createFileSystemWatcher(pattern);
  const notify = async (uri) => {
    try {
      const event = JSON.parse(readFileSync(uri.fsPath, "utf8"));
      const title = event.goal?.title || event.type || "Codex task";
      const next = event.goal?.nextAction || "Open the shared session handoff for the next action.";
      const action = await vscode.window.showInformationMessage(`Cherkani Stack: ${title}`, "Open sessions");
      if (action) await vscode.commands.executeCommand("cherkani-stack.openSharedSessions");
      console.log(`Cherkani Stack next: ${next}`);
    } catch { /* Ignore partial files while the CLI is writing. */ }
  };
  watcher.onDidCreate(notify);
  context.subscriptions.push(watcher);
  context.subscriptions.push(vscode.commands.registerCommand("cherkani-stack.openSharedSessions", () => {
    const uri = vscode.Uri.file(join(sharedHome, "cherkani-stack", "shared-sessions"));
    return vscode.commands.executeCommand("revealInExplorer", uri);
  }));
}

export function deactivate() {}
