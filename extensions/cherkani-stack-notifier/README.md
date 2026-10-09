# Cherkani Stack Notifier

Optional VS Code extension. It watches the shared Cherkani Stack event folder
and displays a notification when a goal or session command completes.

Build and install locally:

```bash
npm install -g @vscode/vsce
cd extensions/cherkani-stack-notifier
vsce package
code --install-extension cherkani-stack-notifier-0.1.0.vsix
```

The extension reads events only. It does not read credentials or Codex history.
