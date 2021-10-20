import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import "./Characters.css";
import { CharacterDetails } from "../../service/CharacterDetails";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function Characters() {
  //characters API, place where the data is called from
  let charArray = CharacterDetails();
  let history = useHistory();

  //The state for the search function
  const [searchHero, setSearchHero] = useState("");
  //The state for the name sort function
  /*
  const [sortType, setSortType] = useState("asc");
  */

  const [array, setArray] = useState(CharacterDetails());
  var overall;

  useEffect(() => {
    setArray(array);
  }, [array]);

  //The function for the click event to change the state of sort type for name sorting (initial method)
  /*
  const setSort = (sortType) => {
    setSortType(sortType);
  };
  */

  function sortAlign(alignment) {
    const tempArray = [];
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i].biography.alignment === alignment) {
        tempArray.push(charArray[i]);
      }
    }
    setArray(tempArray);
  }

  //Name sorting function
  function ascending(obj) {
    obj.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  //Name sorting function
  function descending(obj) {
    obj.sort((a, b) => (b.name > a.name ? 1 : a.name > b.name ? -1 : 0));
    
  function sortPower(sort) {
    let tempArray = array;
    // for (let i = 0; i < 1; i++) {
    //   let intelligence = charArray[i].powerstats.intelligence;
    //   let strength = charArray[i].powerstats.strength;
    //   let speed = charArray[i].powerstats.speed;
    //   let durability = charArray[i].powerstats.durability;
    //   let power = charArray[i].powerstats.power;
    //   let combat = charArray[i].powerstats.combat;
    //   overall = intelligence + strength + speed + durability + power + combat;
    //   // const over = hero => array.values(hero).reduce((a.powerstats, b.powerstats) => a.powerstats + b.powerstats);
    //   tempArray["overall"] = overall;
    //   console.log(tempArray[i]);
    // }

    if (sort === "low") {
      array.sort(function (a, b) {
        return (
          a.powerstats.intelligence +
          a.powerstats.strength +
          a.powerstats.speed +
          a.powerstats.durability +
          a.powerstats.power +
          a.powerstats.combat -
          (b.powerstats.intelligence +
            b.powerstats.strength +
            b.powerstats.speed +
            b.powerstats.durability +
            b.powerstats.power +
            b.powerstats.combat)
        );
      });
    }

    if (sort === "high") {
      array.sort(function (a, b) {
        return (
          b.powerstats.intelligence +
          b.powerstats.strength +
          b.powerstats.speed +
          b.powerstats.durability +
          b.powerstats.power +
          b.powerstats.combat -
          (a.powerstats.intelligence +
            a.powerstats.strength +
            a.powerstats.speed +
            a.powerstats.durability +
            a.powerstats.power +
            a.powerstats.combat)
        );
      });
    }

    console.log(array);
  }

  function getCharacterDetails(character) {
    history.push(`/character/${character.id}`, character);
    console.log(character);
  }

  //The information displayed on each card
  const renderCard = (card, index) => {
    return (
      <Card
        className="scale box"
        border="dark"
        style={{ width: "10rem" }}
        key={index}
        onClick={() => getCharacterDetails(card)}
      >
        <Card.Img src={card.images.lg} />
        <Card.ImgOverlay className="selection-shadow">
          <Card.Title className="character-names">{card.name}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    );
  };

  return (
    <>
      <div className="characters-header">CHOOSE YOUR HERO</div>
      <div className="filter">
        <span className="filter-word">FILTER HEROES</span>
        <span>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
              Names
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown">
              <Dropdown.Item href="#/action-1" onClick={() => ascending(array)}>
                A - Z
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => descending(array)}
              >
                Z - A
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
        <span>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
              Alignments
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown">
              <Dropdown.Item
                href="#/action-1"
                onClick={() => sortAlign("good")}
              >
                GOOD
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() => sortAlign("bad")}>
                EVIL
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => sortAlign("neutral")}
              >
                NEUTRAL
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
        <span>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
              Power
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown">
              <Dropdown.Item href="#/action-1" onClick={() => sortPower("low")}>
                Lowest - Highest
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => sortPower("high")}
              >
                Highest - Lowest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
        <span>
          <SearchIcon fontSize="large" />
          <input
            type="text"
            placeholder="Search for Hero.."
            onChange={(event) => setSearchHero(event.target.value)}
          />
        </span>
      </div>
      <div></div>
      <div className="grid-box">
        {array
          .filter((renderCard) => {
            if (searchHero == "") {
              return renderCard;
            } else if (
              renderCard.name.toLowerCase().includes(searchHero.toLowerCase())
            ) {
              return renderCard;
            }
          })
          .map(renderCard)}
      </div>
    </>
  );
}

export default Characters;
