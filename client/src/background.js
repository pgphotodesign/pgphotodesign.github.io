import React from "react";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from "react-router-dom";

export default function AnimationExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/hsl/10/90/50" />
        </Route>
        <Route path="*">
          <AnimationApp />
        </Route>
      </Switch>
    </Router>
  );
}

function AnimationApp() {
  let location = useLocation();

  return (
    <div style={styles.fill}>
      <ul style={styles.nav}>
        <NavLink to="/gradient2/C1EBE1/93B4AC/45">1</NavLink>
        <NavLink to="/gradient3/85C9C8/D4FEE6/E5FDC9/135">2</NavLink>
        <NavLink to="/gradient4/FA715F/FA715F/DB1174/9B4CA7/45">3</NavLink>
        <NavLink to="/gradient2/556270/C44D58/5">4</NavLink>
        <NavLink to="/gradient2/036564/033649/5">5</NavLink>
      </ul>

      <div style={styles.content}>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Switch location={location}>
              <Route path="/gradient2/:g1/:g2/:angle" children={<Gradient2 />} />
              <Route path="/gradient3/:g1/:g2/:g3/:angle" children={<Gradient3 />} />
              <Route path="/gradient4/:g1/:g2/:g3/:g4/:angle" children={() => <Gradient4 isAuthed={true}/>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

function NavLink(props) {
  return (
    <li style={styles.navItem}>
      <Link {...props} style={{ color: "inherit" }} />
    </li>
  );
}


function Gradient2() {
  let { g1, g2, angle } = useParams();

  return (
    <div
      style={{
        ...styles.fill,
        backgroundImage: `linear-gradient(${angle}deg, #${g1}, #${g2})`
      }}
    >
    </div>
  );
}

function Gradient3() {
  let { g1, g2, g3, angle } = useParams();

  return (
    <div
      style={{
        ...styles.fill,
        backgroundImage: `linear-gradient(${angle}deg, #${g1}, #${g2},  #${g3})`
      }}
    >
    </div>
  );
}

function Gradient4() {
  let { g1, g2, g3, g4, angle } = useParams();

  return (
    <div
      style={{
        ...styles.fill,
        backgroundImage: `linear-gradient(${angle}deg, #${g1}, #${g2},  #${g3}, #${g4})`
      }}
    >
    </div>
  );
}

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};
