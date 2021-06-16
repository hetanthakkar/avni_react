import React, { useState, useEffect } from "react";
import "./App.css";
import ReactStars from "react-rating-stars-component";
import Button from "@material-ui/core/Button";

const axios = require("axios");

export default function App() {
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(-1);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://wallpaperaccess.com/full/124452.jpg"
  );

  const secondExample = {
    size: 30,
    count: 5,
    value: -1,
    a11y: true,
    isHalf: true,
    onChange: (newValue) => {
      setRating(newValue);
    },
  };

  const selectBackground = () => {
    if (quote.tags[0] === "buisness")
      setBackgroundImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mIcAFgE-V3ibdcLXMGXY1FwXmb8iSomhVQ&usqp=CAU"
      );
    if (quote.tags[0] === "education")
      setBackgroundImage(
        "https://us.123rf.com/450wm/maya23k/maya23k1901/maya23k190100345/115065130-school-supplies-on-blue-wooden-background.jpg?ver=6"
      );
    if (quote.tags[0] === "faith")
      setBackgroundImage(
        "https://i.pinimg.com/originals/bc/0e/d2/bc0ed20220fb8d73df05266715c86979.jpg"
      );
    if (quote.tags[0] === "friendship")
      setBackgroundImage(
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZnJpZW5kfGVufDB8fDB8fA%3D%3D"
      );
    if (quote.tags[0] === "future")
      setBackgroundImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbVhrn-Z9V0WVQzzB2JRa-5p3vbNXXKmftw&usqp=CAU"
      );
    if (quote.tags[0] === "happiness")
      setBackgroundImage(
        "https://www.thoughtfortoday.org.uk/wp-content/uploads/2017/08/AdobeStock_123198039.jpeg"
      );
    if (quote.tags[0] === "history")
      setBackgroundImage("https://wallpapercave.com/wp/wp2244221.jpg");
    if (quote.tags[0] === "inspirational")
      setBackgroundImage(
        "http://sfwallpaper.com/images/inspirational-background-images-1.jpg"
      );
    if (quote.tags[0] === "life")
      setBackgroundImage(
        "https://thumbs.dreamstime.com/b/hourglass-background-sunset-value-time-life-eternity-165124263.jpg"
      );
    if (quote.tags[0] === "nature")
      setBackgroundImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6kl_i4iqqBOjYO4ap_y3APP7Qkmn_zgQYQ&usqp=CAUs"
      );

    if (quote.tags[0] === "politics")
      setBackgroundImage(
        "https://images.sharefaith.com/images/3/1456359449110_17/img_mouseover3.jpg"
      );

    if (quote.tags[0] === "religion")
      setBackgroundImage(
        "https://images.sharefaith.com/images/3/1456359449110_17/img_mouseover3.jpg"
      );
    if (quote.tags[0] === "science")
      setBackgroundImage(
        "https://i.pinimg.com/736x/c4/ed/23/c4ed2397c0f68076e613cead6a737f16.jpg"
      );
    if (quote.tags[0] === "technology")
      setBackgroundImage(
        "https://image.freepik.com/free-vector/abstract-technology-background-science-connecting-technology_42705-96.jpg"
      );

    if (quote.tags[0] === "wisdom")
      setBackgroundImage(
        "https://img.freepik.com/free-photo/knowledge-wisdom_28629-1009.jpg?size=626&ext=jpg"
      );
  };
  const fetchQuotes = (tag) => {
    var item = tag[Math.floor(Math.random() * tag.length)];
    var url;
    item
      ? (url = `https://api.quotable.io/random?tags=${item}`)
      : (url = "https://api.quotable.io/random");
    axios
      .get(url)
      .then(async (response) => {
        await setQuote(response.data);
        selectBackground();
        await axios
          .post("http://192.168.2.7:3000/", {
            category: quote.tags[0],
            rating: rating,
          })
          .then(async (response) => {})
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchTags = async () => {
    await axios
      .get("http://192.168.2.7:3000/interested")
      .then(async (response) => {
        fetchQuotes(response.data);
      });
  };
  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    fetchTags();
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: "column",
      }}
    >
      <h2>{quote.content}</h2>
      <h2>{quote.author}</h2>
      <h3>Rate this quote</h3>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactStars {...secondExample} />
      </div>
      <Button
        style={{
          // width: width / 5,
          alignSelf: "center",
          top: height * 0.7,
          position: "absolute",
        }}
        size="large"
        disabled={false ? true : false}
        onClick={fetchTags}
        variant="contained"
        color="primary"
        disableElevation
      >
        Change this Quote
      </Button>
    </div>
  );
}
