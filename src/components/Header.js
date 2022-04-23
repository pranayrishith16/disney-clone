import React, { useEffect } from 'react'
import styled from 'styled-components'
import {auth, provider} from './Firebase'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
    selectUserEmail,
    selectUserName,
    selectUserPhoto,
    setSignOutState,
    setUserLoginDetails
} from '../features/user/userSlice'

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                history('/home')
            }
        })
    },[userName])

    const handleAuth = () => {
        if (!userName){

        auth.signInWithPopup(provider)
        .then((result) => {
            setUser(result.user);
        })
        .catch((error) => {
            console.log((error.message))
        })
        }else if (userName){
            auth.signOut()
            .then(() => {
                dispatch(setSignOutState())
                history('/')
            }).catch((error) => console.log(error.message))
        }

    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name:user.displayName,
            email:user.email,
            photo:user.photoURL,
        }))
    }

    

  return (
    <Nav>
        <Logo>
            <img src='images/logo.svg' alt='disney'/>
        </Logo>
        {
            !userName ? 
            <Login onClick={handleAuth}>LOGIN</Login> :
        <>
        <NavMenu>
            <a href='/home'>
                <img src='images/home-icon.svg' alt='home'/>
                <span>HOME</span>
            </a>
            <a href='/search'>
                <img src='images/search-icon.svg' alt='search'/>
                <span>SEARCH</span>
            </a>
            <a href='/watchlist'>
                <img src='images/watchlist-icon.svg' alt='home'/>
                <span>WATCHLIST</span>
            </a>
            <a href='/originals'>
                <img src='images/original-icon.svg' alt='originals'/>
                <span>ORIGINALS</span>
            </a>
            <a href='/movies'>
                <img src='images/movie-icon.svg' alt='movies'/>
                <span>MOVIES</span>
            </a>
            <a href='/series'>
                <img src='images/series-icon.svg' alt='series'/>
                <span>SERIES</span>
            </a>
        </NavMenu>
        <Menu>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
                <span onClick={handleAuth}>Sign out</span>
            </DropDown>
        </Menu>
        </>
    }
    </Nav>
  )
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    letter-spacing: 16px;
    z-index: 3;
`

const Logo = styled.div`
    padding: 0;
    width: 70px;
    margin-top: 2px;
    max-height: 50px;
    font-size: 0;
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 20px;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;

        img{
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span{
            font-size: 13px;
            color: rgb(249,249,249);
            letter-spacing: 1.2px;
            line-height: 1.08;
            padding: 2px 2px;
            white-space: nowrap;
            position: relative;
            
            &:before{
                display: block;
                background-color: rgb(249,249,249);
                border-radius: 0 0 4px 4px;
                bottom: -6px;
                content: "";
                height: 1.4px;
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 300ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }

        &:hover{
            span:before{
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }

    @media (max-width:768px){
        display: none;
    }
`

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const UserImg = styled.img`
    height: 100%;
`

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background: rgb(19,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /50%) 0 0 18px 0;
    padding: 9px;
    font-size: 14px;
    letter-spacing: 2px;
    width: 110px;
    display:none;
`



const Menu = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg}{
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`

export default Header