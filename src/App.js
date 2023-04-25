import React, { useState, useEffect } from 'react';
import './App.css';
import { FaApple, FaDesktop, FaWhatsapp } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";
import bundlesData from './bundles.json';
import appsData from './apps.json';

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorRange, setErrorRange] = useState(false);
  const [errorBundle, setErrorBundle] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (isLoading2) {

      timeoutId = setTimeout(() => {
        setIsLoading2(false);
      }, 6000);

      intervalId = setInterval(() => {
        setProgress(prevProgress => prevProgress + 1);
      }, 60);

    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      setProgress(0)
    };
  }, [isLoading2]);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (isLoading3) {

      timeoutId = setTimeout(() => {
        setIsLoading3(false);
      }, 3000);

      intervalId = setInterval(() => {
        setProgress(prevProgress => prevProgress + 1);
      }, 30);

    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      setProgress(0)
    };
  }, [isLoading3]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleContinue = () => {
    if (value.length >= 6 && value.length <= 13) {
      setErrorRange(false);
      setSecond(true);
      setIsLoading(true);
    } else {
      setErrorRange(true);
    }
  };

  const handleContinue2 = () => {
    if (!selectedBundle) {
      setErrorBundle(true);

      return;
    }
    setSecond(false);
    setIsLoading2(true);
    setThird(true);
  };

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleBundleClick = bundle => () => {
    if (bundle.status !== 'Sold Out') {
      setSelectedBundle(bundle);
      setErrorBundle(false);
    }
  };

  const handleContinue3 = () => {
    setSecond(false);
    setThird(false);
    setIsLoading3(true);
    setFourth(true);
  };

  const handleContinue4 = () => {
    setVerifyFailed(true);
    setSecond(false);
    setThird(true);
    setFourth(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="centered-div">
          <img src='./assets/img/freefire-logo.png' alt="Example" className="image-logo" />

          {!second && !third && !fourth && <div className="content">
            <p className='enter-id'>Enter Your In-Game UID</p>
            <div className="integer-input">
              <input
                type="text"
                id="integer"
                value={value}
                name={value}
                onChange={handleInputChange}
                placeholder='Enter your in-game UID'
              />
              {error && <p className="error-message">* Please enter a valid number</p>}
              {errorRange && <p className="error-message">* Please enter a number between 6 and 13 digits</p>}
            </div>
            <p className='enter-platform'>Choose Your Platform</p>
            <div className="button-container">
              <div className={`ribbon-box ${activeButton === 1 ? 'button-wiggle' : ''}`}>
                <span></span>
                <button
                  className={`btn-apple ${activeButton === 1 ? 'active button-wiggle' : ''}`}
                  onClick={() => {
                    handleButtonClick(1);
                  }}
                >
                  <BsAndroid2 className='btn-icon'/>
                </button>
              </div>
              <button
                className={`btn-apple ${activeButton === 2 ? 'active button-wiggle' : ''}`}
                onClick={() => {
                  handleButtonClick(2);
                }}
              >
                <FaApple className='btn-icon'/>
              </button>
              <button
                className={activeButton === 3 ? 'active button-wiggle' : ''}
                onClick={() => handleButtonClick(3)}
              >
                <FaDesktop className='btn-icon'/>
              </button>
            </div>
            <div className='btn-proceed-container'>
              <button className='' onClick={handleContinue}>Continue</button>
            </div>
          </div>}

          {second && 
          <div className='content-2'>
            {isLoading ? (
              <div className='loading-container'>
                <div className='spin-load'><img src='./assets/img/loading.png' alt='loading' /></div>
                <div className='loading-page'>
                  <p>Verifying User...</p>
                  <p>{value}</p>
                </div>
              </div>
              ) : (
                <div className="bundles-container">
                  <div className="bundles-section">
                    <p className='enter-platform'>Select Your Bundle!</p>
                    <div className="bundles-grid">
                      {bundlesData.bundles.map((bundle, index) => (
                        <div className={`bundle ${bundle.status} ${selectedBundle === bundle ? 'selected' : ''}`} key={index} onClick={handleBundleClick(bundle)} style = {{cursor: bundle.status === 'Free' ? 'pointer' : 'default'}}>
                          <div className='status-bar' style={{backgroundColor: bundle.status === 'Free' ? '#15c307': 'red'}}></div>
                          <img src='./assets/img/thumbnail.jpg' alt='bundle thumbnail' className='thumbnail'/>
                          <p className="amount">{bundle.amount} FreeFire Diamonds</p>
                          <p className="status" style={{color: bundle.status === 'Free' ? '#15c307': 'red'}}>{bundle.status}</p>
                        </div>
                      ))}
                    </div>
                      <div className='btn-share-container'>
                      <button className='continue3' onClick={handleShare}><FaWhatsapp/> <span>{isCopied ? 'Copied Link!' : 'Share'}</span></button>
                    </div>
                    <p className="notice-apps">* Share Our Service For Extra <span className='yellow'>110 Diamonds</span> Bonus</p>
                    <div className='btn-proceed-container' style={{marginTop: '0.5em'}}>
                    {errorBundle && <p className="error-message">* Please select a bundle</p>}
                      <button className='continue2' onClick={handleContinue2}>Continue</button>
                    </div>
                  </div>
                </div>
              )}
          </div>
          }


          {third && 
          <div className='content'>
            {isLoading2 ? (
              <div className="loading-container2 loading-content">
                <p className='generating-text'><img src='./assets/img/diamond.png' alt='diamond' /><span>Generating Diamonds...</span></p>
                <progress max='100' value={progress}></progress>
                <p className='progress-percentage'>{progress}%</p>
              </div>
              ) : (
                <div className="verification-container">
                  <div className='your-order'>
                    <h5>Your <span>Order</span></h5>
                    <p>Player's UID: {value}</p>
                    <p>Game Title: Free Fire</p>
                    <p>{`Bundle Value: ${selectedBundle.amount} Diamonds ${isCopied ? '+ 110 Diamonds' : ''}`}</p>
                    <p>Device Info: {activeButton === 1 ? 'Android' : activeButton === 2 ? 'IOS' : 'Emulator'}</p>
                    <p>Total Price: 0.00 <span>Free</span></p>
                  </div>
                  <div className='verification-status'>
                    <h5>Order Status: <span className='green'>Confirmed</span></h5>
                    <h5>Human Verification: <span className={`${verifyFailed ? 'red' : ''}`}> {`${verifyFailed ? 'Failed' : 'Pending!'}`}</span></h5>
                    <p className="error-message">* Please Complete the Human Verification Process</p>
                    <div className='btn-verify-container'>
                      <button className='continue2' onClick={handleContinue3}>Verify</button>
                    </div>
                    <div className='notice-container'>
                      <p className="notice">Diamonds Will Be Transferred To Your <span className='yellow'>Account</span> <br/> Within <span className='red'>24 Hours</span> Of Successful Human <span className='green'>Verification</span> Process</p>
                    </div>
                    <div className='notice-container'>

                      {/* Add your BlogSpot link here. Replace href="/" with href="your link" */}
                      <p className="instructions">How to complete human verification? <a href='/'>Click Here</a></p> 
                    
                    </div>
                  </div>
                </div>
              )}
          </div>
          }

          
          {fourth && 
          <div className='content-3'>
            {isLoading3 ? (
              <div className="loading-container2 loading-content">
                <p className='generating-text'><img src='./assets/img/diamond.png' alt='diamond' /><span>Checking for Offers...</span></p>
                <progress max='100' value={progress}></progress>
                <p className='progress-percentage'>{progress}%</p>
              </div>
              ) : (
                <div className="apps-section">
                  <p className='enter-platform'><span className='yellow'>Complete</span> Your Verification</p>
                  <div className="bundles-grid">
                    {appsData.apps.map((app, index) => (
                      <div className='app-content' key={index}>
                        <img src={app.img} alt={`app ${index}`} className=''/>
                        <p className="">Download and Register on <br/>{app.name} to Complete Verification</p>
                        <div className='download-btn'>
                          <a className="" href={app.url} target='_blank' rel="noopener noreferrer">Download</a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='btn-proceed-container'>
                      <button className='continue2' onClick={handleContinue4}>Confirm</button>
                    </div>
                </div>
              )}
          </div>
          }

        </div>
      </header>
    </div>
  );
}

export default App;
