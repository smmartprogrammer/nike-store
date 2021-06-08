import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from 'react-router-dom';
import Shoes from './shoes.json';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/launch">Launch</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="launch" element={<Launch />}>
          <Route path="/" element={<LaunchIndex />} />
          <Route path=":slug" element={<LaunchShoe />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div>
      <h1> Not Found </h1>
      <p>Sorry Your Page not found</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1> Sita raam </h1>
    </div>
  );
}

function Launch() {
  return (
    <div>
      <h1> Launch </h1>
      <Outlet />
    </div>
  );
}

function LaunchIndex() {
  return (
    <ul>
      {Object.entries(Shoes).map(([slug, { name, img, price }]) => (
        <li key={slug}>
          <Link to={`/launch/${slug}`}>
            <h2>{name}</h2>
            <img src={img} alt={name} />
            <h2>{price}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LaunchShoe() {
  const { slug } = useParams();
  const shoe = Shoes[slug];

  if (!shoe) {
    return <h2>Not found</h2>;
  }

  const { name, img, price } = shoe;
  return (
    <div>
      <h2>{name} </h2>
      <img src={img} alt={name} />
      {slug}
    </div>
  );
}
