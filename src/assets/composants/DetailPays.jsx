import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DetailPays.css';

function DetailPays() {
  const { nom } = useParams();
  const navigate = useNavigate();
  const [pays, setPays] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${nom}?fullText=true`)
      .then((response) => {
        setPays(response.data[0]);
        setChargement(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des détails du pays :', error);
        setChargement(false);
      });
  }, [nom]);

  if (chargement) {
    return <p>Chargement des détails...</p>;
  }

      //Luniouy Afficher si le pays est introuvable

  if (!pays) {
    return <p>Impossible de trouver les détails pour ce pays.</p>;
  }

  return (
    <div className="detail-conteneur">
      <div className="detail-carte">
        <img src={pays.flags.png} alt={`Drapeau de ${pays.name.common}`} />
        {/* Informations wu pays yi */}
        <h1>{pays.name.common}</h1>
        <p>Capitale : {pays.capital?.[0] || 'N/A'}</p>
        <p>Population : {pays.population.toLocaleString()}</p>
        <p>Région : {pays.region}</p>
        <p>Sous-région : {pays.subregion || 'N/A'}</p>
        <p>Superficie : {pays.area.toLocaleString()} km²</p>
        <button onClick={() => navigate(-1)} className="bouton-retour">
          Retour
        </button>
      </div>
    </div>
  );
}

export default DetailPays;
