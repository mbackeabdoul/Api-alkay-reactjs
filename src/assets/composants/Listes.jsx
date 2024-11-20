import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MonComposant.css';

function MonComposantListesDePays() {
  const [donnees, setDonnees] = useState(null); // État pour stocker les données des pays
  const [recherche, setRecherche] = useState(''); // État pour la barre de recherche
  const [chargement, setChargement] = useState(true); // État pour indiquer si les données sont en cours de chargement

  // Récupération des données des pays depuis l'API au chargement du composant
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setDonnees(response.data); // Stockage des données dans l'état
        setChargement(false); // Indique que le chargement est terminé
      })
      .catch((error) => {
        console.error('Une erreur est survenue :', error); // Gestion des erreurs en cas de problème avec l'API
        setChargement(false); // Terminer le chargement même en cas d'erreur
      });
  }, []);

  // Filtrage des pays en fonction de la recherche saisie
  const donneesFiltrees = donnees?.filter((donnee) =>
    donnee.name.common.toLowerCase().includes(recherche.toLowerCase())
  );

  // Afficher un message de chargement si les données ne sont pas encore disponibles
  if (chargement) {
    return (
      <div className="chargement">
        <span className="loading loading-ring loading-lg"></span>
        <p>Chargement des données...</p>
      </div>
    );
  }

  // Rendu du composant principal
  return (
    <div className="conteneur">
      {/* Barre de recherche pour filtrer les pays */}
      <div className="barre-recherche">
        <input
          type="text"
          placeholder="Rechercher un pays..." // Texte par défaut dans le champ de recherche
          value={recherche} // Lier la valeur à l'état
          onChange={(e) => setRecherche(e.target.value)} // Mise à jour de l'état à chaque saisie
          className="input-recherche"
        />
      </div>

      {/* Grille affichant les cartes des pays */}
      <div className="grille">
        {donneesFiltrees?.length > 0 ? (
          donneesFiltrees.map((donnee, index) => (
            // Rendre la carte entière cliquable avec Link
            <Link
              to={`/pays/${donnee.name.common}`} // Lien vers la page des détails du pays
              key={index}
              className="carte-lien"
            >
              <div className="carte">
                {/* Affichage du drapeau du pays */}
                <img
                  src={donnee.flags.png}
                  alt={`Drapeau de ${donnee.name.common}`} // Texte alternatif pour l'image
                  className="carte-image"
                />
                {/* Affichage du nom du pays */}
                <h3 className="carte-titre">{donnee.name.common}</h3>
                {/* Bouton "Voir Détail" qui reste cliquable */}
                <Link
                  to={`/pays/${donnee.name.common}`} // Lien pour voir plus de détails
                  className="carte-bouton"
                  onClick={(e) => e.stopPropagation()} // Empêche la propagation du clic vers la carte
                >
                  Voir Détail
                </Link>
              </div>
            </Link>
          ))
        ) : (
          // Message affiché si aucun résultat n'est trouvé
          <p className="aucun-resultat">Aucun pays trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default MonComposantListesDePays;
