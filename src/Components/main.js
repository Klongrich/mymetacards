import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Web3 from "web3";
import MetaCardsABI from "./MetaCardsNft.json"
import { NFTStorage, File } from 'nft.storage';

import mymetaLogo from "./mymetalogo.png";
import CardBackground from "./Green_screen_metacard.png";

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const MetaCardNftContacts = "0xc85D232cdf6eB37533a72F86f16e0Df306c391cC";

const { apiKey } = require("./config.json")
const client = new NFTStorage({ token: apiKey })

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: '43b86485d3164682b5d703fd1d39fe1c' // required
      }
    }
  }

const MobileContainer = styled.div`

text-align: center;

h2 {
    font-family: Space Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 82px;

    color: #FFFFFF;
}

p {
    font-family: DM Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;

    color: #FFFFFF;
}
`

export const MobileDashedBox = styled.div`
    
    margin-left: 50px;
    margin-top: 30px;
    margin-bottom: 50px;

    width: 258px;
    height: 383px;

    border: 4px dashed #7E7E7E;
    border-radius: 4px;

    font-family: DM Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    text-align: center;

    color: #C4C4C4;
`

const HeaderContainer = styled.div`
    background-color: black;

    img {
        margin-left: -230px;
        margin-top: 30px;
    }

`

const HeaderMobileContainer = styled.div`
    background-color: black;
    width: 100%;
    text-align:center;

    padding-top: 30px;

    img {
       
    }

    h2 {
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 46px;
        color: #FFFFFF;
    }
`

const MobileConnectButton = styled.div`  
    /* Rectangle 1 */
    width: 136px;
    height: 32px;

    background: #FF2C58;
    border-radius: 4px;
    font-family: DM Sans;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    line-height: 23px;
    color: #000000;

    padding-top: 8px;

    :hover {
        background-color: #ff577b;
        cursor: pointer;
    }

    margin-top: 30px;
    margin-left: 33%;

`

const TopText = styled.div`
    font-family: Space Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 46px;
    /* identical to box height */
    color: #FFFFFF;

    margin-top: 30px;
    margin-left: 120px;
    float: left;
`

const ConnectButton = styled.div`  
    /* Rectangle 1 */
    width: 136px;
    height: 32px;

    background: #FF2C58;
    border-radius: 4px;
    font-family: DM Sans;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    line-height: 23px;
    color: #000000;

    padding-left: 15px;
    padding-top: 8px;

    margin-top: 30px;
    margin-right: 50px;
    float: right;

    :hover {
        background-color: #ff577b;
        cursor: pointer;
    }

`

const Container = styled.div`
    width: 500px;

    font-family: DM Sans;
    font-style: normal;

    text-align: left;
    padding-left: 70px;

    h2 {
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        line-height: 82px;

        color: #FFFFFF;
    }

    p {
        font-family: DM Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;

        color: #FFFFFF;
    }
`

export const DashedBox = styled.div`
    width: 258px;
    height: 383px;

    border: 4px dashed #7E7E7E;
    border-radius: 4px;

    float: right;
    margin-top: -420px;
    margin-right: 50px;
`

export const InputBox = styled.input`
    width: 333px;
    height: 40px;
    
    background: #FFFFFF;
    border: 2px solid #C41EFF;
    box-sizing: border-box;
    border-radius: 4px;
`

export const MintButton = styled.button`
width: 146px;
height: 40px;

background: #C41EFF;
border-radius: 4px;


font-family: DM Sans;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 23px;

margin-top: 70px;
margin-left: 132px;

`

export const SubmitButton = styled.button`

width: 146px;
height: 40px;

background: #C41EFF;
border-radius: 4px;

margin-top: 20px;

`

export const SubmitButtonText = styled.div`

width: 62px;
height: 23px;


font-family: DM Sans;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 23px;

text-align:center;
padding-left: 28px;

color: #000000;

`

export const UploadInput = styled.div`
    margin-top: -270px;
    padding-left: 42px;

    p {
        margin-left: -42px;
    }

`

export default function PageOne() {
    const [name, setName] = useState("Metacards");
    const [twitter, setTwitter] = useState("@Twitter_handle");
    const [image, setImage] = useState(null);
    
    const [pageState, setPageState] = useState("stepone")
    const [walletAddress, setWalletAddress] = useState("Connect Web3");

   // const [provider, setProvider] = useState(null);
    const [web3, setWeb3] = useState(null);

  //  const [tokenURIlink, setTokenURIlink] = useState("");

    const isWindowClient = typeof window === "object";

    const [windowSize, setWindowSize] = useState(
        isWindowClient ? window.innerWidth : undefined
      );

    const web3Modal = new Web3Modal({
        network: 'rinkeby', // optional
        cacheProvider: false, // optional
        providerOptions // required
    });

    async function loadWeb3() {
        const provider = await web3Modal.connect();
        const web3 = await new Web3(provider);
  
       // setProvider(provider);
        setWeb3(web3);

        if (web3) {
            const accounts = await web3.eth.getAccounts();
            const address = { account: accounts[0] }.account;
            setWalletAddress(address);
        }
        
       // console.log("what the fuck");
      }
  
     

    async function mint_nft(TokenURI) {

        const Ethaccounts = await web3.eth.getAccounts();
    
        const MetaCardContract = new web3.eth.Contract(
          MetaCardsABI.abi,
          MetaCardNftContacts
        );
    
        await MetaCardContract.methods
          .mint(
            Ethaccounts[0],
            Math.floor(Math.random() * (10000000 - 1)) + 1,
            TokenURI
          )
          .send({ from: Ethaccounts[0] })
          .once("receipt", (receipt) => {
            console.log(receipt);
          });
      }
    
      async function send_data_to_ipfs() {
        const metadata = await client.store({
          name: name,
          description: twitter,
          image: new File([image] , 'MetaCards.png', { type: 'image/png' })
        })
        console.log(metadata.url)
       // setTokenURIlink(metadata.url);
    
        await mint_nft(metadata.url);
      }

      useEffect(() => {

        function setSize() {
          setWindowSize(window.innerWidth);
        }
    
        if (isWindowClient) {
          window.addEventListener("resize", setSize);
          return () => window.removeEventListener("resize", setSize);
        }        

      }, [isWindowClient, setWindowSize]);

      if (windowSize > 999) {

        if (pageState === "stepone") {
    return (
        <>

        <HeaderContainer>
            <img src={mymetaLogo} height="42" width="42" alt="logo" /> 

            <TopText>
                MetaCards
            </TopText>

            <ConnectButton onClick={() => loadWeb3()}>
               {walletAddress}
            </ConnectButton>
        </HeaderContainer>

        <Container>
            <h2>
                Step 1 enter your data
            </h2>
        
            <p>
                Your Name
            </p>

            <InputBox
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
            
            <p>
                Your Twitter
            </p>
            <InputBox  
                  name="twitter"
                  type="text"
                  placeholder="Your twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)} />
            
            <br /> <br />

            <SubmitButton onClick={() => setPageState("steptwo")}>         
            <SubmitButtonText>
                Submit
            </SubmitButtonText>
            </SubmitButton>

        </Container>

        <DashedBox >
                <img Style="z-index: 0;
                            width: 258px;
                            height: 385px;" src={image} alt=""
                            />
        
    
                Click here to upload
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(URL.createObjectURL(file));
                  }}
                />

            </DashedBox>
        </>
        ) 
      } else if (pageState === "steptwo") {
        return (
            <>
                
        <HeaderContainer>
            <img src={mymetaLogo} height="42" width="42" alt="logo" /> 

            <TopText>
                MetaCards
            </TopText>

            <ConnectButton onClick={() => loadWeb3()}>
                {walletAddress}
            </ConnectButton>
        </HeaderContainer>


        <Container>

            <h2>Step 2 Mint your trading card</h2>

            <p>Card Preview</p>
            <p Style="color: #C41EFF; 
                      float: right;
                      margin-top: -40px;
                      margin-right: 105px;"
                      >
                        Edit </p>
            <img Style="margin-top: 2rem;
                        margin-bottom: -55px;
                        background-size: cover;
                        background-color: white;
                        border-radius: 1rem;
                        width: 80%;
                        height: 350px;"
                        src={CardBackground}
                        alt=""
            />

            <img Style="margin-top: -520px;
                        margin-left: 118px;
                        z-index: 2;
                        border-radius: 10px;
                        width: 165px;
                        height: 270px;" src={image}
                        alt="" 
            />
        </Container>

        <MintButton onClick={() => send_data_to_ipfs()} >
                    Mint
        </MintButton>
            </>
        )
      }
    }
    else {
        if (pageState === "stepone") {
        return (
            <>
                <HeaderMobileContainer>
                    <img src={mymetaLogo} height="42" width="42" alt="logo" />
                    <h2> MetaCards </h2> 
    
                    <MobileConnectButton onClick={() => loadWeb3()}>
                        Connect Web3
                    </MobileConnectButton>
                </HeaderMobileContainer>

                <MobileContainer>
            <h2>
                Step 1 enter your data
            </h2>
        
            <p>
                Your Name
            </p>

            <InputBox
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
            
            <p>
                Your Twitter
            </p>
            <InputBox  
                  name="twitter"
                  type="text"
                  placeholder="Your twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)} />
            
            <br /> <br />

            <MobileDashedBox >
                <img Style="z-index: 0;
                            width: 258px;
                            height: 385px;" src={image} 
                            alt=""
                            />
        
                <UploadInput>
                <p> Click here to upload </p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(URL.createObjectURL(file));
                  }}
                />
                </UploadInput>
            </MobileDashedBox>

            <SubmitButton onClick={() => setPageState("steptwo")}>            
                Submit
            </SubmitButton>

        </MobileContainer>
            </>
        )
    } else if (pageState === "steptwo") {
        return (
            <>
                <HeaderMobileContainer>
                    <img src={mymetaLogo} height="42" width="42" alt="logo"/>
                    <h2> MetaCards </h2> 
    
                    <MobileConnectButton onClick={() => loadWeb3()}>
                        Connect Web3
                    </MobileConnectButton>
                </HeaderMobileContainer>

                <MobileContainer>

                
                    <h2>Step 2 Mint your trading card</h2>

                    <p>Card Preview</p>
                    <p Style="color: #C41EFF">Edit </p>
                    <img Style="margin-top: 2rem;
                                margin-bottom: -55px;
                                background-size: cover;
                                background-color: white;
                                border-radius: 1rem;
                                width: 80%;
                                height: 350px;"
                                src={CardBackground}
                                alt=""
                                />
                    
                    <img Style="
                            margin-top: -520px;
                            z-index: 2;
                            border-radius: 10px;
                            width: 147px;
                            height: 270px;" src={image} 
                            alt=""
                            />
                </MobileContainer>

                <MintButton onClick={() => send_data_to_ipfs()} >
                    Mint
                </MintButton>
            </>
        )
    } 
    }
}