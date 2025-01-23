import React from "react";

const Card = ({ children, bg = 'bg-gray-100' }) => {
  return (
    <>
      <div className={`${bg} p-6 rounded-lg shodaw-md`}>{children}</div>
    </>
  );
};

export default Card;
