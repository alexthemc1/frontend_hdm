
# Modifications et Ajouts Récents

## 1. Gestion des tâches
- Implémentation de la modification des tâches avec `handleSave`
- Implémentation de la suppression des tâches avec `handleDelete`
- Ajout d'un système de suivi des modifications avec `editedTasks`

## 2. Interface utilisateur
- Activation du bouton de sauvegarde uniquement quand le texte est modifié
- Ajout des notifications avec Snackbar de la bibliothèque Material-UI afin d'informer l'utilisateur :
  - Message de succès en vert lors d'une sauvegarde/suppression réussie
  - Message d'erreur en rouge en cas d'échec

## 3. Optimisations
- Ajout des `key` props pour optimiser le rendu des listes
- Gestion des états avec useState pour les notifications
- Gestion des erreurs avec try/catch
