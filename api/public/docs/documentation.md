# Documentation de l'API

## Introduction
Cette API permet de gérer les utilisateurs, les catways et les réservations. Elle offre des fonctionnalités d'inscription, de connexion, de gestion des quais et de réservation de places.

## Endpoints

### 1. Utilisateurs
Ces routes permettent la gestion des comptes utilisateurs : inscription, connexion et déconnexion.

#### ➤ Inscription
**POST** `/users/register`
- **Description** : Permet d'inscrire un nouvel utilisateur.
- **Body** :
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** :
  ```json
  {
    "message": "Utilisateur créé avec succès."
  }
  ```

#### ➤ Connexion
**POST** `/users/login`
- **Description** : Permet à un utilisateur de se connecter et de recevoir un token JWT.
- **Body** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** :
  ```json
  {
    "token": "jwt_token"
  }
  ```

#### ➤ Déconnexion
**GET** `/users/logout`
- **Description** : Déconnecte l'utilisateur et détruit la session.
- **Réponse** : Redirige vers `/`.

### 2. Gestion des Catways
Ces routes permettent l'affichage, l'ajout, la modification et la suppression des catways.

#### ➤ Liste des catways
**GET** `/catways`
- **Description** : Affiche tous les catways disponibles.
- **Réponse** : Affiche une page avec la liste des catways.

#### ➤ Ajouter un catway
**POST** `/catways`
- **Description** : Ajoute un nouveau catway.
- **Body** :
  ```json
  {
    "catwayNumber": "string",
    "catwayType": "string",
    "catwayState": "string"
  }
  ```
- **Réponse** : Redirige vers `/catways`.

#### ➤ Détails d'un catway
**GET** `/catways/:id`
- **Description** : Affiche les détails d'un catway spécifique.
- **Réponse** : Affiche une page avec les informations du catway.

#### ➤ Modifier un catway
**POST** `/catways/edit/:id`
- **Description** : Modifie l'état d'un catway existant.
- **Body** :
  ```json
  {
    "catwayState": "string"
  }
  ```
- **Réponse** : Redirige vers `/catways`.

#### ➤ Supprimer un catway
**GET** `/catways/delete/:id`
- **Description** : Supprime un catway de la base de données.
- **Réponse** : Redirige vers `/catways`.

### 3. Gestion des Réservations
Ces routes permettent d'afficher, d'ajouter, de modifier et de supprimer des réservations.

#### ➤ Liste des réservations
**GET** `/reservations`
- **Description** : Affiche toutes les réservations existantes.
- **Réponse** : Affiche une page avec la liste des réservations.

#### ➤ Ajouter une réservation
**POST** `/reservations`
- **Description** : Ajoute une nouvelle réservation.
- **Body** :
  ```json
  {
    "catwayNumber": "string",
    "clientName": "string",
    "boatName": "string",
    "startDate": "date",
    "endDate": "date"
  }
  ```
- **Réponse** : Redirige vers `/reservations`.

#### ➤ Détails d'une réservation
**GET** `/reservations/:id`
- **Description** : Affiche les détails d'une réservation spécifique.
- **Réponse** : Affiche une page avec les détails de la réservation.

#### ➤ Modifier une réservation
**POST** `/reservations/edit/:id`
- **Description** : Modifie une réservation existante.
- **Body** :
  ```json
  {
    "clientName": "string",
    "boatName": "string",
    "startDate": "date",
    "endDate": "date"
  }
  ```
- **Réponse** : Redirige vers `/reservations`.

#### ➤ Supprimer une réservation
**GET** `/reservations/delete/:id`
- **Description** : Supprime une réservation de la base de données.
- **Réponse** : Redirige vers `/reservations`.



