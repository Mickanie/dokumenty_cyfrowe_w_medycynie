import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/NewAttachment.css";

class NewAttachment extends Component {
  render() {
    const documentType = this.props.documentType;
    return (
      <div className="container">
        <Link
          to="/recommendations/create-new"
          className="backButton"
          style={{ position: "absolute", top: "200px", left: "170px" }}
        >
          <button>Powrót</button>
        </Link>
        {documentType === "prescription" && (
          <div>
            <h2>Nowa recepta</h2>
            <form className="attachment-form">
              <label>
                Informacje o leku:{" "}
                <input
                  type="text"
                  placeholder="Nazwa, ilość, dawkowanie"
                  name="medicine"
                  required
                />
              </label>
              <label>
                Odpłatność: <input type="text" name="payment" required />
              </label>
              <label>
                Data od dnia: <input type="date" name="start-date" />
              </label>
              <input type="submit" value="Dodaj" />
            </form>
          </div>
        )}

        {documentType === "sickleave" && (
          <div>
            <h2>Nowe zwolnienie lekarskie</h2>
            <form className="attachment-form">
              <label>
                Miejsce pracy:{" "}
                <input type="text" name="place-of-work" required />
              </label>
              <label>
                od: <input type="date" name="start-date" required />
              </label>
              <label>
                do: <input type="date" name="end-date" required />
              </label>
              <input type="submit" value="Dodaj" />
            </form>
          </div>
        )}

        {documentType === "referral" && (
          <div>
            <h2>Nowe skierowanie</h2>
            <form className="attachment-form">
              <label>
                Skierowanie do:{" "}
                <input
                  type="text"
                  name="referral-type"
                  placeholder="poradni specjalistycznej, pracowni diagnostycznej"
                  required
                />
              </label>
              <label>
                Badanie:{" "}
                <input
                  type="text"
                  name="examination"
                  placeholder="konsultacja, badanie USG"
                  required
                />
              </label>
              <label>
                Rozpoznanie: <input type="text" name="diagnosis" required />
              </label>
              <label>
                Cel: <input type="text" name="aim" required />
              </label>
              <input type="submit" value="Dodaj" />
            </form>
          </div>
        )}

        {documentType === "lab-order" && (
          <div>
            <h2>Nowe zlecenie na badanie</h2>
            <form className="lab-order-form">
              <div className="tests">
                <label>
                  <input type="checkbox" name="test" value="OB" />
                  OB
                </label>
                <label>
                  <input type="checkbox" name="test" value="glukoza" />
                  Glukoza
                </label>
                <label>
                  <input type="checkbox" name="test" value="LDL" />
                  LDL
                </label>
                <label>
                  <input type="checkbox" name="test" value="HDL" />
                  HDL
                </label>
                <label>
                  <input type="checkbox" name="test" value="TG" />
                  Trójglicerydy
                </label>
                <label>
                  <input type="checkbox" name="test" value="morfologia" />
                  Morfologia
                </label>
                <label>
                  <input type="checkbox" name="test" value="magnez" />
                  Magnez
                </label>
                <label>
                  <input type="checkbox" name="test" value="sód" />
                  Sód
                </label>
                <label>
                  <input type="checkbox" name="test" value="potas" />
                  Potas
                </label>
                <label>
                  <input type="checkbox" name="test" value="żelazo" />
                  Żelazo
                </label>
              </div>
              {/* TO DO przesłanie dokumentu do bazy danych, powrót do ekranu dodawania nowego zalecenia z dodanym załącznikiem */}
              <input type="submit" value="Dodaj" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default NewAttachment;
