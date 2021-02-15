import React, { Component, useState } from "react";
import { getCards, saveCard, logoutUser } from "../../firebase";

class ProfilePage extends Component {
  addNewCard(event, cardText) {
    saveCard(cardText);
    console.log(event);
    console.log(cardText);
  }
  getAllCards() {
    getCards().then((res) => {
      setCards(res);
    });
  }

  componentDidMount = async () => {
    getAllCards();
    console.log("loaded!");
  };

  clearInput(event) {
    console.log(event);
    setCardText("");
  }
  onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if (name === "cardText") {
      setCardText(value);
    }
  }
  logout(event) {
    logoutUser();
  }
  deleteCard(event, cardId) {
    console.log(cardId);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <form className="container-fluid justify-content-end">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={(event) => {
                logout(event);
              }}
            >
              LOGOUT
            </button>
          </form>
        </nav>
        <div className="mb-3 bg-body pb-4">
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col-6">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                ></label>
                <textarea
                  className="form-control border border-dark border-2 rounded-3"
                  id="cardText"
                  name="cardText"
                  value={cardText}
                  onChange={(event) => onChangeHandler(event)}
                  rows="3"
                ></textarea>
              </div>
              <div className="col">
                <div className="row mt-4">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={(event) => {
                        addNewCard(event, cardText);
                      }}
                    >
                      ADD+
                    </button>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={(event) => {
                        clearInput(event);
                      }}
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card text-center br-20">
                <div className="container">
                  {/* {cards.map((card) => { */}
                  <div className="row">
                    <div className="col-sm-1">
                      <h4 className="mgn-badge">
                        <span className="badge bg-primary">1</span>
                      </h4>
                    </div>
                    <div className="col-sm-10">
                      <div className="card-body">
                        {/* <p className="card-text">{card.cardText}</p> */}
                      </div>
                    </div>
                    <div className="col-sm-1">
                      <a
                        href="#"
                        className="btn btn-primary"
                        // onClick={(event) => {
                        //   deleteCard(event, card.uid);
                        // }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  ;{/* //})} */}
                </div>

                <div className="card-footer text-muted bg-primary bbr-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
