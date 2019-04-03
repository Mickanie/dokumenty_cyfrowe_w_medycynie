import React, { Component } from "react";

class Document extends Component {
  state = {
    documents: [
      {
        title: "Wynik badania krwi 2019-03-15",
        id: 1,
        content: "Tabelka HTML z badaniami"
      },
      {
        title: "Konsultacja kardiologiczna 2019-01-17",
        id: 2,
        content: "blablabla"
      },

      {
        title: "Wypis ze szpitala 2018-12-11",
        id: 3,
        content: "Wypisik ze szpitala"
      },
      {
        title: "Wynik badania EKG 2018-09-22",
        id: 4,
        content: "EKG zrobione!"
      }
    ]
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const id = this.props.match.params.documentId;
    console.log(id);
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center"
        }}
      >
        <button onClick={this.goBack}>Powrót</button>
        <p>{this.state.documents[id - 1].title}</p>
        <p>{this.state.documents[id - 1].content}</p>
        <button>Zapisz do PDF</button>
      </div>
    );
  }
}

export default Document;
