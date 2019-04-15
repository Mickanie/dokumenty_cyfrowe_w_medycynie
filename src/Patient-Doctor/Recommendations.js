import React, { Component } from "react";
import "../css/Recommendations.css";
import { transformFromDB } from '../DateParser'
import { Link } from "react-router-dom";

class Recommendations extends Component {
  state = {
    recommendations: [
      /*       {
        id: 1,
        date: "2019-01-02",
        doctor: "dr Anna Nowak",
        content:
          "dieta niskokaloryczna, Lek XXX 200mg 2x1, Lek YYY 1x1, unikanie wysiłku, kontrola za 2 tygodnie",
        attachments: ["receptaXXX", "receptaYYY"]
      },
      {
        id: 2,
        date: "2018-11-22",
        doctor: "dr Artur Bąk",
        content: "zwolnienie z pracy 2 tyg, pić dużo płynów",
        attachments: ["zwolnienie-2211-0512"]
      },
      {
        id: 3,
        date: "2018-10-26",
        doctor: "dr Joanna Lubelska",
        content: "zrobić USG serca",
        attachments: ["skierowanieUSG"]
      } */
    ]
  };

  componentDidMount() {
    fetch("http://localhost:3000/recommendations")
      .then(result => result.json())
      .then(data => this.setState({ recommendations: data }));
  }
  render() {
    return (
      <div className="container recommendations-container">
        {this.props.activeAccount === "doctor" && (
          <Link to="/recommendations/create-new">
            <button>Dodaj zalecenie</button>
          </Link>
        )}

        <div className="content">
          {this.state.recommendations.map((recommendation, i) => {
            return (
              <div className="recommendation" key={i}>
                <p>Data: {transformFromDB(recommendation.date)} </p>
                <p>Lekarz: {recommendation.doctor} </p>
                <p>Treść: {recommendation.content}</p>
                <p>
                  Załączone dokumenty:{" "}
                  {recommendation.attachedDocuments.map((attachment, i) => (
                    <Link
                      key={i}
                      style={{
                        margin: "10px",
                        color: "white",
                        textDecoration: "underline"
                      }}
                      to={`/recommendations/:${attachment}`}
                    >
                      {attachment}
                    </Link>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Recommendations;
