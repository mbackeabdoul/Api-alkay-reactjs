import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MonComposant.css';

function MonComposantListesDePays() {
  const [donnees, setDonnees] = useState(null); // État bi pour stocker les données des pays
  const [recherche, setRecherche] = useState(''); // État wu barre de recherche
  const [chargement, setChargement] = useState(true); // État biy indiquer si les données sont en cours de chargement

  // Récupération wu donnéey pays yi depuis l'API au chargement du composant
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setDonnees(response.data); // Stockage des données dans l'état
        setChargement(false); // dfay wanei si le chargement est terminé
      })
      .catch((error) => {
        console.error('Une erreur est survenue :', error); // Gestion des erreurs en cas de problème ak l'API
        setChargement(false); // Terminer le chargement même en cas d'erreur
      });
  }, []);

  // Filtrage des pays en fonction de la recherche saisie
  const donneesFiltrees = donnees?.filter((donnee) =>
    donnee.name.common.toLowerCase().includes(recherche.toLowerCase())
  );

  // Afficher benn message de chargement bu nekkee les données ne sont pas encore disponibles
  if (chargement) {
    return (
      <div className="chargement">
        <span className="loading loading-ring loading-lg"></span>
        <p>Chargement des données...</p>
      </div>
    );
  }

  // Rendu wu composant principal bi
  return (
    <div className="conteneur">
      <div className="barre-recherche">
        <input
          type="text"
          placeholder="Rechercher un pays..." 
          value={recherche} // Lier la valeur à l'état
          onChange={(e) => setRecherche(e.target.value)} // Mise à jour l'état bi à chaque saisie
          className="input-recherche"
        />
      </div>

      {/* Grille afficher les cartes des pays */}
      <div className="grille">
        {donneesFiltrees?.length > 0 ? (
          donneesFiltrees.map((donnee, index) => (
            // pour carte bi yeipp cliquable
            <Link
              to={`/pays/${donnee.name.common}`} // Lien bi jeum ci la page des détails du pays
              key={index}
              className="carte-lien"
            >
              <div className="carte">
                {/* Affichage du drapeau du pays */}
                <img
                  src={donnee.flags.png}
                  alt={`Drapeau de ${donnee.name.common}`}
                  className="carte-image"
                />
                {/* Affichage du nom du pays */}
                <h3 className="carte-titre">{donnee.name.common}</h3>
                {/* Bouton "Voir Détail" bi tamit reste cliquable */}
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
          // Message biy affiché si aucun résultat n'est trouvé
          <p className="aucun-resultat">Aucun pays trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default MonComposantListesDePays;
