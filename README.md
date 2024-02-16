Nicolas CAPELLA (xxcolas):
- Création du projet
- Création de la base de données(liveShare avec Benoît)
- Inscription des clients et des manager
- Connexion
- Mot de passe oublié + envoi de mail
- Page d'accueil avec les franchises
- Carte de geolocalisation avec les franchises
- Partie administration (création de users, d'entreprises, etc)
- CI/CD:
    - Tests unitaires Back phpunit
    - Tests unitaires Front cypress
    - Notification discord sur différents évènements
    - Déploiement sur un VPS via self hosted github
- Notifications par mail pour la création d'entreprise + validation dans l'administration

Benoît De Carli (Benoitapps):
- Creation de la base de données (liveShare avec Nicolas)
- Recherche avec filtres de prestation
- Choix des créneaux disponibles avec possibilité de choisir parmi les emploi du temps de plusieurs
  salariés
- Espace de visualisation de ses réservations avec possibilité
   - d’annuler
   - décaler le RDV
   - de reprendre RDV (même prestataire / même prestation / même salarié)
- Dashboard avec statistiques Manager
- Dashboard avec statistiques Admin
- Gérer les planning d’équipe
-  créneau des jours de travail 
-  créneau d’indisponibilité (congés)
-  chaque salarié doit avoir un planning personnel basé sur ses créneaux horaires 
- Implémenter des traductions(i18next) FR et EN
- Implementations des Emails(resend)
- Modification(PATCH) de la partie Manager
- Gestion de l'envoie en base du KBIS
- Gestion de l'envoie en base des Images
- CI/CD:
    - Tests unitaires Back phpunit
    - Securistaion de branch
    - ajout d'un linter