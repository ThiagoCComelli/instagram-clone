import '../styles/Navbar.css'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Navbar(){
    return(
        <>
            <div className="mainNavbar">
                <div className="mainNavbarContents">
                    <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                    <input placeholder="Search" type="text" />
                    <div className="mainNavbarContentsIcons">
                        <HomeOutlinedIcon className="icon"/>
                        <EmailOutlinedIcon className="icon"/>
                        <ExploreOutlinedIcon className="icon"/>
                        <FavoriteBorderIcon className="icon"/>
                        <span className="navbarAvatar">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar