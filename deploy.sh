#!/bin/bash

# ─────────────────────────────────────────────
#  Dico Pattern — Script de déploiement rapide
#  Usage : ./deploy.sh "message de commit"
#  ou    : ./deploy.sh   (message auto avec date)
# ─────────────────────────────────────────────

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Se placer dans le dossier du script
cd "$(dirname "$0")"

# Vérifier que c'est bien un repo git
if [ ! -d ".git" ]; then
  echo -e "${RED}❌ Pas de repo Git trouvé dans ce dossier.${NC}"
  echo "   Lance d'abord : git init && git remote add origin <url>"
  exit 1
fi

# Message de commit : argument ou auto
if [ -n "$1" ]; then
  MSG="$1"
else
  DATE=$(date '+%d %b %Y %H:%M')
  MSG="Deploy $DATE"
fi

echo -e "${YELLOW}📦 Fichiers modifiés :${NC}"
git status --short

echo ""
echo -e "${YELLOW}📝 Commit : \"$MSG\"${NC}"
echo ""

# Staging des fichiers principaux
git add index.html index-beta.html sw.js sw-beta.js manifest.json 2>/dev/null

# Staging des docs si présents
git add IDEES-applenotes.txt IDEES.md JOURNAL-projet.md 2>/dev/null

# Commit
git commit -m "$MSG"
COMMIT_STATUS=$?

if [ $COMMIT_STATUS -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Rien à commiter (fichiers déjà à jour).${NC}"
  exit 0
fi

# Push
echo ""
echo -e "${YELLOW}🚀 Push vers GitHub...${NC}"
git push

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ Déployé sur GitHub Pages !${NC}"
  echo -e "   🌐 https://roustella-art.github.io/dico-pattern/"
  echo -e "   🧪 https://roustella-art.github.io/dico-pattern/index-beta.html"
else
  echo ""
  echo -e "${RED}❌ Push échoué. Vérifie ta connexion ou tes droits GitHub.${NC}"
fi
