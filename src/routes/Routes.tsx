import React from "react";
import { Route as Switch, Routes, BrowserRouter } from "react-router-dom";

import { Comments } from "../screens/Comments";
import { Home } from "../screens/Home";

export function Route() {
  return (
    <BrowserRouter>
      <Routes>
        <Switch path="/" element={<Home />} />
        <Switch path="/:id/comments" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  );
}
