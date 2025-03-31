import { Outlet } from "react-router-dom";

const GithubStateLayout = () => {
  <GithubState>
    <Outlet /> // nested routes render out here
  </GithubState>;
};

export default GithubStateLayout;
