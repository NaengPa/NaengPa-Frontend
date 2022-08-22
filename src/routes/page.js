import Main from "../pages/MainPage/Main";
import Detail from "../pages/DetailPage/Detail";
import Search from "../pages/SearchPage/Search";
import MyPage from "../pages/MyPage/MyPage";
import Community from "../pages/CommunityPage/Community";
import Frige from "../pages/FrigePage/Frige";
import MyFrige from "../pages/MyFrigePage/MyFrige";
import ResultList from "../pages/resultList";
import Login from "../pages/LoginPage/login";
import SignIn from "../pages/SignIn/signIn";
// import Navigation from "../components/navigation";
// import styled from "styled-components";

const pages = [
  { pathname: "/", element: <Main></Main>, isPublic: true },
  {
    pathname: "/:recipeId/detail",
    element: <Detail></Detail>,
    isPublic: false,
  },
  { pathname: "/search", element: <Search></Search>, isPublic: true },
  { pathname: "/mypage", element: <MyPage></MyPage>, isPublic: false },
  { pathname: "/Community", element: <Community></Community>, isPublic: true },
  { pathname: "/frige", element: <Frige></Frige>, isPublic: false },
  { pathname: "/myfrige", element: <MyFrige></MyFrige>, isPublic: true },
  {
    pathname: "/resultlist",
    element: <ResultList></ResultList>,
    isPublic: true,
  },
  { pathname: "/login", element: <Login></Login>, isPublic: true },
  { pathname: "/signin", element: <SignIn></SignIn>, isPublic: true },
];

export default pages;
