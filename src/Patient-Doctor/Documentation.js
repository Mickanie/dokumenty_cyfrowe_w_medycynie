import React, { Component } from "react";
import '../css/Documentation.css';
import {Link } from 'react-router-dom'


class Documentation extends Component {

  state = {
    documents: [

      {
        title: "Wynik badania krwi 2019-03-15",
        id: 1,
        content: 'Tabelka HTML z badaniami'
      },
      {
         title: "Konsultacja kardiologiczna 2019-01-17",
         id: 2,
         content: 'Opis wizyty u kardiologa'

      },

       {
       title: "Wypis ze szpitala 2018-12-11",
       id: 3,
       content: 'Wypisik ze szpitala'
     },
     {
      title: "Wynik badania EKG 2018-09-22",
      id: 4,
      content: 'EKG zrobione!'
     }
    ]
  }
  render() {
    return (
      <div className="container documentation-container">
      {this.props.activeAccount === "doctor" && <button>Dodaj dokument</button>}
      <form className="filterForm">
        <label>Filtruj po tagu: <select name="tags">
          <option value="wszystko">Wszystko</option>
          <option value="badania-krwi">Badanie krwi</option>
          <option value="badania-usg">Badanie USG</option>
         
          <option value="badania-ekg">Badanie EKG</option>
          <option value="echo-serca">Echo serca</option>
          <option value="obrazowanie">Obrazowanie medyczne (TK/MRI)</option>
          <option value="angiografia">Angiografia / Koronarogradia</option>
          <option value="kardiologia">Kardiologiczne</option>
          <option value="wypis-szpital">Wypis ze szpitala</option>


          </select></label>
        <label>Filtruj po dacie:  od <input type="date"></input> do <input type="date"/></label>
        <input type="submit" value="Filtruj"></input>
        </form>
        <div className="documents content">
        <ul>
        {this.state.documents.map((document, i) => {
          
          return( <li key={i}><Link style={{fontWeight: "600", textDecoration: "underline"}} to={`/documentation/document${document.id}`}>{document.title}</Link></li>)
        })}


        </ul>
       
        </div>
   

        
      </div>

      
    );
  }
}



export default Documentation;
