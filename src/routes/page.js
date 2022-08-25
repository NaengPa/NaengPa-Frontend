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
import WriteArticle from "../pages/CommunityPage/WriteArticle";
// import Navigation from "../components/navigation";
// import styled from "styled-components";

const pages = [
  { pathname: "/", element: <Main></Main>, isPublic: true },
  {
    pathname: "/:recipeId/detail",
    element: <Detail></Detail>,
    isPublic: true,
  },
  { pathname: "/search", element: <Search />, isPublic: true },
  { pathname: "/mypage", element: <MyPage />, isPublic: false },
  { pathname: "/community", element: <Community />, isPublic: true },
  { pathname: "/write", element: <WriteArticle />, isPublic: true },
  { pathname: "/frige", element: <Frige />, isPublic: false },
  { pathname: "/myfrige", element: <MyFrige />, isPublic: true },
  {
    pathname: "/resultlist",
    element: <ResultList />,
    isPublic: true,
  },
  { pathname: "/login", element: <Login />, isPublic: true },
  { pathname: "/signin", element: <SignIn />, isPublic: true },
];

export default pages;
