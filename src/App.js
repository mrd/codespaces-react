import './App.css';
import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, styled } from "@mui/material";

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
  const [surveyData, setSurveyData] = useState({age: false});

  if (surveyData.age) {
    return MainScreen();
  } else {
    return Survey(setSurveyData);
  }

}

function Survey(setSurveyData) {
  function handleClick() {
    setSurveyData({age: true});
  }
  return <>
  <h1>Survey</h1>
    <Grid container>
      <Grid item xs={4}>
        <label>Age</label>
      </Grid>
      <Grid item xs={8}>
        <select>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="56-65">56-65</option>
          <option value="66-75">66-75</option>
          <option value="76-85">76-85</option>
          <option value="86+">86+</option>
        </select>
      </Grid>
      <Grid item xs={4}>
        <label>Income</label>
      </Grid>
      <Grid item xs={8}>
        <select>
          <option value="0-20k">0-20k</option>
          <option value="20k-40k">20k-40k</option>
          <option value="40k-60k">40k-60k</option>
          <option value="60k-80k">60k-80k</option>
          <option value="80k-100k">80k-100k</option>
          <option value="100k+">100k+</option>
        </select>
      </Grid>
      <Grid item xs={4}>
        <label>Postal code</label>
      </Grid>
      <Grid item xs={8}>
        <input type="text" />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleClick}>Submit</Button>
      </Grid>
    </Grid>
  </>;
}

function MainScreen() {
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
                  <Item style={{ width: "60px" }}>
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
