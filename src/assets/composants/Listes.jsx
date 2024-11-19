import React, { useState, useEffect } from 'react';
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

  const donneesFiltrees = donnees?.filter((donnee) =>
    donnee.name.common.toLowerCase().includes(recherche.toLowerCase())
  );

  if (chargement) {
    return (
      <div className="chargement">
        <span className="loading loading-ring loading-lg"></span>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="conteneur">
      {/* <h1 className='font-size: 0.75rem'>Liste des pays</h1> */}
      <div className="barre-recherche">
        <input
          type="text"
          placeholder="Rechercher un pays..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="input-recherche"
        />
      </div>

      <div className="grille">
        {donneesFiltrees?.length > 0 ? (
          donneesFiltrees.map((donnee, index) => (
            <div key={index} className="carte">
              <img
                src={donnee.flags.png}
                alt={`Drapeau de ${donnee.name.common}`}
                className="carte-image"
              />
              <h3 className="carte-titre">{donnee.name.common}</h3>
              <p className="carte-texte">Capitale : {donnee.capital?.[0] || 'N/A'}</p>
              <p className="carte-texte">
                Population : {donnee.population.toLocaleString()}
              </p>
              <p className="carte-texte">Région : {donnee.region}</p>
              <p className="carte-texte">Sous-région : {donnee.subregion || 'N/A'}</p>
              <p className="carte-texte">
                Superficie : {donnee.area.toLocaleString()} km² 
                {/* Afficher superficie wu du pays en kilomètres carrés ba parei Formater le nombre pour être lisible. */}
              </p>
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
