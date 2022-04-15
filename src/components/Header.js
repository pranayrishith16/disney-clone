import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <Nav>
        <Logo>
            <img src='images/logo.svg' alt='disney'/>
        </Logo>
        <NavMenu>
            <a href='/home'>
                <img src='images/home-icon.svg' alt='home'/>
                <span>HOME</span>
            </a>
        </NavMenu>
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
    margin-left: 25px;

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
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0;
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

export default Header