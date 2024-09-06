CURRENT_DIR = $(CURDIR)
FRONTEND_DIR = $(CURRENT_DIR)/frontend
BACKEND_DIR = $(CURRENT_DIR)/backend

frontend = cd $(FRONTEND_DIR) && pnpm i && pnpm build && mkdir -p ../backend/static && rm -rf ../backend/static/* && cp -r ./dist/* ../backend/static/ && echo 'frontend build successfully'
backend = cd $(BACKEND_DIR) && bash -c 'python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && python main.py'

frontend:
	$(frontend)

backend:
	$(backend)

all: frontend backend

.PHONY: frontend backend all