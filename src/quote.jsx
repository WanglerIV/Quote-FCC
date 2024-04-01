import React, { useState, useEffect } from 'react';

export default function Quote(){

    const[backgroundData, setBackgroundData] = useState([
        "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
        "https://images.pexels.com/photos/507932/pexels-photo-507932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://i.pinimg.com/originals/61/e2/d3/61e2d3267cb5ff33d7fbafc46c22ead6.jpg",
        "https://images.pexels.com/photos/2748019/pexels-photo-2748019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/734102/pexels-photo-734102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        "https://images.pexels.com/photos/977659/pexels-photo-977659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/13923392/pexels-photo-13923392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ])


    const [currentBG, setCurrentBG] = useState(backgroundData[0]);
    const [previousBG, setPreviousBG] = useState(null);

    const[allQuotesData, setAllQuotesData] = useState()

    useEffect(() => {
        const fetchData = async () => {
          
             await axios.get('https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json') .then(function (response) {
                const allData = response.data.quotes
                setAllQuotesData(allData)
            })
              .catch(function (error) {
                console.log("err: "+error);
              });;     
        };
    
      fetchData();
      }, []);

    const [info, setInfo] = useState({
        randomQuote: "Silence is a man's best friend. Do not forget to listen to your inner voice, no matter what others think.",
        author: "Miyamoto Musashi"
    })

    function getQuote(){
        const randomNumber = Math.floor(Math.random() * allQuotesData.length)
        let randomBackgroundIndex = Math.floor(Math.random() * backgroundData.length);

        // Check if the randomly selected background is the same as the previous one
        while (backgroundData[randomBackgroundIndex] === previousBG) {
            randomBackgroundIndex = Math.floor(Math.random() * backgroundData.length);
        }
        console.log(randomBackgroundIndex)

        setPreviousBG(backgroundData[randomBackgroundIndex]);
        setCurrentBG(backgroundData[randomBackgroundIndex]);


        setInfo(set =>({
            ...set,
            randomQuote: allQuotesData[randomNumber].quote,
            author: "- " + allQuotesData[randomNumber].author
        }))

    }

    const style = {
        backgroundImage: `url(${currentBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundColor: "rgba(z, 4, 2, 0.9)"
    }
    
    const deneme = {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: "-1",
        position: "fixed",
    }
    return(
            <main style={style}>
                <div className='opa' style={deneme}></div>
                <div id="quote-box">
                    <div className='quoteLogo'>"</div>
                    <div id="text"><h1>{info.randomQuote}</h1></div>
                    <div id="author"><h2>{info.author}</h2></div>
                    <div className="buttons">
                        <a  className="hide"  target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/330px-X_logo_2023.svg.png" alt="X" /></a>
                        <button id="new-quote" onClick={getQuote}>New Quote</button>
                        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/330px-X_logo_2023.svg.png" alt="X" /></a>
                    </div>
                </div>
            </main>
    )
} 