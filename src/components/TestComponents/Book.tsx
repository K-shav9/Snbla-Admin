import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphQl/queries";

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {skip: false});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {data.books.map((book:any, index:number) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
