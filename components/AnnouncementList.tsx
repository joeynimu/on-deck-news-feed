import { Announcement } from "graphql-queries/generated/graphql";
import { FC } from "react";
import styled from "styled-components";

const AnnouncementsList: FC<{
  loading: boolean;
  error: any;
  data: Announcement[] | undefined;
}> = ({ loading, error, data }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  const isEmpty = !loading && !error && data?.length === 0;

  if (isEmpty) {
    return (
      <EmptyMessage>
        No announcements at this time. Please check again later.
      </EmptyMessage>
    );
  }

  return (
    <ul>
      {data?.map(({ body, title, id, created_ts }) => (
        <li key={id}>
          <h3>{title}</h3>
          <p>
            Posted on: <small>{created_ts}</small>
          </p>
          <p>{body}</p>
        </li>
      ))}
    </ul>
  );
};

export default AnnouncementsList;

const EmptyMessage = styled.p`
  padding: 5px 0;
  text-align: center;
  font-weight: 600;
`;

export const BackButton = styled.button`
  cursor: pointer;
  padding: 4px 0;
  margin-bottom: 10px;
`;
