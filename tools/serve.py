#!/usr/bin/env python3
"""Serve only the app files (not .git, research/, tests/ ...).  Usage: python3 tools/serve.py [port]

tools/poses.html (the pose gallery) stays reachable for pose authoring.
"""

import http.server
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ALLOWED_FILES = {
    "/",
    "/index.html",
    "/app.js",
    "/styles.css",
    "/data.js",
    "/poses.js",
    "/manifest.webmanifest",
    "/sw.js",
    "/tools/poses.html",
}
ALLOWED_DIRS = {"/poses/": (".js",), "/icons/": (".png", ".svg")}


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".webmanifest": "application/manifest+json"}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        # Always fetch fresh files so edits (and new poses) show up on the phone immediately.
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        allowed = path in ALLOWED_FILES or (
            ".." not in path
            and any(path.startswith(d) and path.endswith(ext) for d, ext in ALLOWED_DIRS.items())
        )
        if not allowed:
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        self.do_GET()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8650
    http.server.ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
