import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import PaintPanel from "./paint";
import TestPanel from './test'
import HomePanel from './Home'

export default function App() {

  return (
    <div>
      <h1>Basic Example</h1>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePanel />} />
          <Route path="about" element={<PaintPanel />} />
          <Route path="test" element={<TestPanel />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">paint</Link>
          </li>
          <li>
            <Link to="/test">test</Link>
          </li>
          {/* <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li> */}
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}





