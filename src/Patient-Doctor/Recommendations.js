import React, { Component } from "react";
import "../css/Recommendations.css";
import { Link } from "react-router-dom";

class Recommendations extends Component {
  state = {
    recommendations: []
  };

  componentDidMount() {
    fetch("https://medical-documentation.herokuapp.com/recommendations")
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
                <p>Data: {recommendation.date} </p>
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
                      to={`/recommendations/attached-document-:${attachment.id}`}
                    >
                      {attachment.title}
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
