import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MonComposant.css';

function MonComposantListesDePays() {
  const [donnees, setDonnees] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setDonnees(response.data);
        setChargement(false);
      })
      .catch((error) => {
        console.error('Une erreur est survenue :', error);
        setChargement(false);
      });
  }, []);

  // Filtrage des pays en fonction de la recherche saisie
  const donneesFiltrees = donnees?.filter((donnee) =>
    donnee.name.common.toLowerCase().includes(recherche.toLowerCase())
  );

    // dafay Afficher benn message de chargement bu nekkee les données sont en cours de récupération

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
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)} // Mise à jour de la recherche en temps réel
          className="input-recherche"
        />
      </div>

      <div className="grille">
        {donneesFiltrees?.length > 0 ? (
          donneesFiltrees.map((donnee, index) => (
            <div key={index} className="carte">
                {/* Affichage du drapeau yi */}

              <img
                src={donnee.flags.png}
                alt={`Drapeau de ${donnee.name.common}`}
                className="carte-image"
              />
               {/* turu pays yi */}
              <h3 className="carte-titre">{donnee.name.common}</h3>
              <Link to={`/pays/${donnee.name.common}`} className="carte-bouton">
                Voir Détail
              </Link>
            </div>
          ))
        ) : (
          <p className="aucun-resultat">Aucun pays trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default MonComposantListesDePays;
