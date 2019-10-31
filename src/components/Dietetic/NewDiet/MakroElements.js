import React from "react";

import { withStyles } from "@material-ui/core";

const styles = () => ({
  container: {
    margin: "3rem 0"
  },
  micro: {
    display: "flex",
    flexDirection: "column"
  },
  box: {
    width: "20%",
    boxSizing: "border-box",
    border: ".5px solid #63D1F4",
    borderTop: "none",
    padding: "0px 15px",
    fontSize: "12px",
    margin: 0,
    background: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    "&:not(:first-of-type)": {
      borderLeft: "none"
    }
  },
  microBox: {
    display: "flex"
  },
  title: {
    background: "#63D1F4",
    color: "#fff",
    padding: "1px 15px"
  },
  bold: {
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "auto"
  }
});

const MakroElements = props => {
  const { classes, meals } = props;

  const renderMikro = micro => {
    let quantity = 0;

    meals.forEach(meal => {
      if (meal.ingredients) {
        const ingredients = meal.ingredients;
        ingredients.forEach(ingredient => {
          if (ingredient[micro]) quantity += parseInt(ingredient[micro]);
        });
      }
    });

    return quantity;
  };

  renderMikro();

  return (
    <div className={classes.container}>
      <div className={classes.norms}>
        <div className={classes.title}>
          <p>Normy dzienne</p>
        </div>
        <div>
          <p>Normy</p>
        </div>
      </div>
      <div className={classes.micro}>
        <div className={classes.title}>
          <p>Mikroelementy</p>
        </div>
        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Stosunek kw. tł. n3:n6</p>
            <p>1.0 / 1.0</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Sód</p>
            <p>{renderMikro("sodium")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Potas</p>
            <p>{renderMikro("potassium")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Wapń</p>
            <p>{renderMikro("calcium")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Fosfor</p>
            <p>{renderMikro("phosphorus")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Magnez</p>
            <p>{renderMikro("magnesium")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Żelazo</p>
            <p>{renderMikro("iron")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Cynk</p>
            <p>{renderMikro("zinc")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Miedź</p>
            <p>{renderMikro("copper")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Mangan</p>
            <p>{renderMikro("manganese")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Jod</p>
            <p>{renderMikro("iodine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina A</p>
            <p>{renderMikro("vitamin_A_RAE")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Retinol</p>
            <p>{renderMikro("retinol")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>β-karoten</p>
            <p>{renderMikro("carotene_beta")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina D</p>
            <p>{renderMikro("vitamin_D")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina E</p>
            <p>{renderMikro("vitamin_E")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Tiamina</p>
            <p>{renderMikro("thiamin")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Ryboflawina</p>
            <p>{renderMikro("riboflavin")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Niacyna</p>
            <p>{renderMikro("niacin")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina B6</p>
            <p>{renderMikro("vitamin_B6")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Foliany</p>
            <p>{renderMikro("folate_total")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina B12</p>
            <p>{renderMikro("vitamin_B_12")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Witamina C</p>
            <p>{renderMikro("vitamin_C")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C4:0</p>
            <p>{renderMikro("c_4_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C6:0</p>
            <p>{renderMikro("c_6_0")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>C8:0</p>
            <p>{renderMikro("c_8_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C10:0</p>
            <p>{renderMikro("c_10_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C12:0</p>
            <p>{renderMikro("c_12_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C14:0</p>
            <p>{renderMikro("c_14_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C15:0</p>
            <p>{renderMikro("c_15_0")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>C16:0</p>
            <p>{renderMikro("c_16_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C17:0</p>
            <p>{renderMikro("c_17_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C18:0</p>
            <p>{renderMikro("c_18_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C20:0</p>
            <p>{renderMikro("c_20_0")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Kwasy tłuszczowe nasycone ogółem</p>
            <p>{renderMikro("nkt")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>C14:1</p>
            <p>{renderMikro("c_14_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C15:1</p>
            <p>{renderMikro("c_15_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C16:1</p>
            <p>{renderMikro("c_16_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>17:1</p>
            <p>{renderMikro("c_17_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C18:1</p>
            <p>{renderMikro("c_18_1")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>C20:1</p>
            <p>{renderMikro("c_20_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C22:1</p>
            <p>{renderMikro("c_22_1")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>
              Kwasy tłuszczowe jednonienasycone ogółem
            </p>
            <p>{renderMikro("jnkt")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C18:2</p>
            <p>{renderMikro("c_18_2")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C18:3</p>
            <p>{renderMikro("c_18_3")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>C18:4</p>
            <p>{renderMikro("c_18_4")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C20:3</p>
            <p>{renderMikro("c_20_3")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>C20:4</p>
            <p>{renderMikro("c_20_4")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>EPA</p>
            <p>{renderMikro("c_20_5")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>DPA</p>
            <p>{renderMikro("c_22_5")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>DHA</p>
            <p>{renderMikro("c_22_6")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>
              Kwasy tłuszczowe wielonienasycone ogółem
            </p>
            <p>{renderMikro("wnkt")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>n-6</p>
            <p>{renderMikro("n_6")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>n-3</p>
            <p>{renderMikro("n_3")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Izoleucyna</p>
            <p>{renderMikro("isoleucine")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Leucyna</p>
            <p>{renderMikro("leucine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Lizyna</p>
            <p>{renderMikro("lysine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Metionina</p>
            <p>{renderMikro("methionine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Cysteina</p>
            <p>{renderMikro("cystine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Fenyloalanina</p>
            <p>{renderMikro("phenylalanine")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Tyrozyna</p>
            <p>{renderMikro("tyrosine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Treonina</p>
            <p>{renderMikro("threonine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Tryptofan</p>
            <p>{renderMikro("tryptophan")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Walina</p>
            <p>{renderMikro("valine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Arginina</p>
            <p>{renderMikro("arginine")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Histydyna</p>
            <p>{renderMikro("histidine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Alanina</p>
            <p>{renderMikro("alanine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Kwas asparaginowy</p>
            <p>{renderMikro("aspartic_acid")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Kwas glutaminowy</p>
            <p>{renderMikro("glutamic_acid")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Glicyna</p>
            <p>{renderMikro("glycine")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Prolina</p>
            <p>{renderMikro("proline")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Seryna</p>
            <p>{renderMikro("serine")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Woda</p>
            <p>{renderMikro("water")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Cholesterol</p>
            <p>{renderMikro("cholesterol")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Sacharoza</p>
            <p>{renderMikro("sucrose")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Laktoza</p>
            <p>{renderMikro("lactose")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Skrobia</p>
            <p>{renderMikro("starch")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Węglowodany ogółem</p>
            <p>{renderMikro("carbohydrates_total")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Odpadki</p>
            <p>{renderMikro("waste")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>
              Wartość energetyczna wg rozp. 1169/2011(kcal)
            </p>
            <p>{renderMikro("energy_value_according_regulation_kcal")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Wartość energetyczna (kJ)</p>
            <p>{renderMikro("energy_value_kj")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>
              Wartość energetyczna wg rozp. 1169/2011(kJ)
            </p>
            <p>{renderMikro("energy_value_according_regulation_kj")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Białko zwierzęce</p>
            <p>{renderMikro("animal_protein")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Białko roślinne</p>
            <p>{renderMikro("plant_protein")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Białko ogółem wg rozp. 1169/2011</p>
            <p>{renderMikro("protein_according_regulation")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>Popiół</p>
            <p>{renderMikro("ash")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Sól</p>
            <p>{renderMikro("salt")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Glukoza</p>
            <p>{renderMikro("glucose")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>Fruktoza</p>
            <p>{renderMikro("fructose")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>% energii z białka</p>
            <p>{renderMikro("protein_energy")}</p>
          </div>
        </div>

        <div className={classes.microBox}>
          <div className={classes.box}>
            <p className={classes.bold}>% energii z tłuszczu</p>
            <p>{renderMikro("fat_energy")}</p>
          </div>
          <div className={classes.box}>
            <p className={classes.bold}>% energii z węglowodanów</p>
            <p>{renderMikro("carbohydrates_energy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(MakroElements);
