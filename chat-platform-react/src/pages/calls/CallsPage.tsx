import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { CallsSidebar } from "@-components/sidebars/calls/CallsSidebar";
import { AppDispatch, fetchFriendsThunk } from "@-store";

export const CallsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, []);
  return (
    <>
      <CallsSidebar />
      <Outlet />
    </>
  );
};
