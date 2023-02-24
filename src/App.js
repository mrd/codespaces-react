import './App.css';
import React, { useState, useEffect } from "react";
//import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { styled } from "@mui/material/styles";
//import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

function Streetview({ name, centred, id }) {
  const clas = centred ? "centred" : "edge";
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div style={{ visibility: imgLoaded ? "visible" : "hidden" }}>
      <img
        id={id}
        class={clas}
        src={name}
        style={{ display: imgLoaded ? "block" : "none" }}
        width={centred ? "320" : "160"}
        height={centred ? "240" : "120"}
        alt="streetview"
        onLoad={(_e) => setImgLoaded(true)}
      />
    </div>
  );
}

const gridStyles = {
  border: 0,
  backgroundColor: "white",
  paddingBottom: 2,
  paddingRight: 2,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 400
};

const impGridStyles = {
  border: "none",
  margin: 0,
  padding: 0,
  backgroundColor: "white",
  paddingBottom: 2,
  paddingRight: 2,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 400
};

const buttonDescs = [
  { smiley: "\u{1F626}", text: "worse" },
  { smiley: "\u{1F641}", text: "bad" },
  { smiley: "\u{1F610}", text: "neutral" },
  { smiley: "\u{1F642}", text: "good" },
  { smiley: "\u{1F603}", text: "better" }
];

const thingsToRate = [
  "walkability",
  "safety",
  "livability",
  "biking-friendliness",
  "sustainability"
];

const amsImgs = [
  "ams1.jpg",
  "ams2.jpg",
  "ams3.jpg",
  "ams4.jpg",
  "ams5.jpg",
  "ams6.jpg"
];

function randompick(arr, num = 1) {
  const idxs = [];
  var idx;
  num = num > arr.length ? arr.length : num;
  for (var i = 0; i < num; i++) {
    do {
      idx = Math.floor(Math.random() * arr.length);
    } while (idxs.includes(idx));
    idxs.push(idx);
  }
  return idxs.map((idx) => arr[idx]);
}

function App() {
    const PrefButton = styled(Button)({
    textTransform: "none"
  });
  const [showImpressions, setShowImpressions] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const [curView, setCurView] = useState({
    thingToRate: null,
    image: null,
    impressions: null
  });

  function refresh() {
    const imgs = randompick(amsImgs, 4);
    setCurView({
      thingToRate: randompick(thingsToRate)[0],
      image: imgs[0],
      impressions: imgs.slice(1, 4)
    });
  }
  useEffect(() => {
    refresh();
    setLoaded(true);
  }, []); // run-once with empty deps array
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Grid
        container
        style={gridStyles}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={12}
          direction="column"
          spacing={0}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xl={4}>
            <h1>Rate {curView.thingToRate}:</h1>
          </Grid>
          <Grid item xl={4}>
            <Item>
              <Streetview centred="1" name={curView.image} />
            </Item>
          </Grid>
          <Grid item xl={4}>
            <Grid item container xs spacing={0}>
              {buttonDescs.map((bd) => {
                function handleClick() {
                  refresh();
                }
                return (
                  <Item style={{ width: "75px" }}>
                    <PrefButton onClick={handleClick}>
                      {bd.smiley}
                      <br />
                      {bd.text}
                    </PrefButton>
                  </Item>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {showImpressions ? (
          <>
            <Grid
              item
              xs={12}
              style={{ display: "flex" }}
              justifyContent="center"
            >
              <PrefButton onClick={() => setShowImpressions(false)}>
                <span>Other Amsterdam impressions</span>
              </PrefButton>
            </Grid>
            <Grid item container style={impGridStyles} xs={12} spacing={0}>
              {curView.impressions.map((img) => {
                return (
                  <Grid item xs={4}>
                    <Item>
                      <Streetview id="imp" name={img} />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={12}
            style={{ display: "flex" }}
            justifyContent="center"
          >
            <PrefButton onClick={() => setShowImpressions(true)}>
              <span>Amsterdam</span>
            </PrefButton>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default App;
