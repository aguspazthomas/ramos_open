from __future__ import annotations

import http.server
import os
import socketserver
import sys
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent
DEFAULT_PORT = 3000


class SpaRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def do_GET(self):
        request_path = self.path.split("?", 1)[0].split("#", 1)[0]
        resolved_path = ROOT_DIR / request_path.lstrip("/")

        if request_path in {"", "/"} or resolved_path.is_file():
            return super().do_GET()

        self.path = "/index.html"
        return super().do_GET()


def main() -> None:
    port = DEFAULT_PORT

    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    elif os.getenv("PORT"):
        port = int(os.getenv("PORT", DEFAULT_PORT))

    with socketserver.TCPServer(("127.0.0.1", port), SpaRequestHandler) as httpd:
        print(f"Ramos Open local preview: http://localhost:{port}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
