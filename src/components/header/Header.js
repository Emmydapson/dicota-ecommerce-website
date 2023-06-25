import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ImMenu3 } from "react-icons/im";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnlogin, { ShowOnlogout } from "../hiddenLink/hiddenLink";




const logo = (<div className={styles.logo}>
  <Link to="/">
      <img src="https://www.dicota.com/media/logo/websites/1/footer_white_1.png" alt='logo' />
  

  </Link>

</div>
);

const cart = (
  <span className={styles.cart}>
                  <Link to="/cart">
                    Cart
                    <FaShoppingCart size={20}/>
                    <p>0</p>
                  </Link>
                </span>
);

const activeLink =({isActive}) => (isActive ? `${styles.active}` : "")

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate =useNavigate();

  const dispatch = useDispatch()

  //monitor currently sign in user
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)

        if(user.displayName == null){
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          console.log(uName);
          setdisplayName(uName);
        } else{
        setdisplayName(user.displayName);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName? user.displayName : displayName,
          userID: user.uid,
        }));
        
      } else {
        setdisplayName("")
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
    
  }, [dispatch, displayName]);

  const toggleMenu= () => { 
    setShowMenu(!showMenu)
   };

   const hideMenu=() => {
    setShowMenu(false)
   };

   const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully.")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
   }
  return (
    <header>
        <div className={styles.header}>
            {logo}
            <nav className={showMenu ? `${styles["show-nav"]}`
            : `${styles["hide-nav"]}`}>

              <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` 
              : `${styles["nav-wrapper"]}`}
              onClick={hideMenu}></div>
               
              <ul onClick={hideMenu}>
                <li className={styles["logo-mobile"]}>
                  {logo}
                  <AiFillCloseCircle size={22} color="#fff" onClick={hideMenu}/>
                </li>
                <li>
                  <NavLink to="/" className={activeLink}>
                     Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={activeLink}>
                     Contact us
                  </NavLink>
                </li>

              </ul>
              <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>
                  <ShowOnlogout>
                  <NavLink to="/login" className={activeLink}>Login</NavLink>
                  </ShowOnlogout>
                  <ShowOnlogin>
                  <a href="#home" style={{color:"#ff7722"}}>
                    <FaUserCircle size={16}/>
                    Hi, {displayName}
                  </a>
                  </ShowOnlogin>
                  <ShowOnlogin>
                  <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
                  </ShowOnlogin>
                  <ShowOnlogin>
                  <NavLink to="/" onClick={logoutUser}>Log Out</NavLink>
                  </ShowOnlogin>

                </span>
                {cart}
                

              </div>
              
            </nav>

            <div className={styles["menu-icon"]}>
              {cart}
              <ImMenu3 size={28} onClick={toggleMenu}/>
            </div>

        </div>
    </header>
        
    
  )
}

export default Header