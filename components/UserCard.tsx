import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import Card from "./Card";
import Markdown from "./Markdown";

type User = {
  id: number;
  name: string;
  bio: string;
  created_ts: string;
  fellowship: "founders" | "angels" | "writers";
  avatar_url: string;
};

type Project = {
  id: number;
  name: string;
  icon_url: string;
};

export const UserList: FC<{ user: User; projects?: Project[] | null }> = ({
  user,
  projects,
}) => {
  return (
    <StyledLi>
      <Columns>
        <ColumnLeft>
          <Link href={`/users/${user.id}`}>
            <a>
              <Avatar src={user.avatar_url} />
            </a>
          </Link>
        </ColumnLeft>
        <ColumnRight>
          <Link href={`/users/${user.id}`}>
            <a>
              <h2>{user.name}</h2>
            </a>
          </Link>
          <p>Joined on: {user.created_ts}</p>
          <p>Fellowship: {user.fellowship}</p>
          {!!projects?.length && (
            <>
              <h3>Projects:</h3>
              {projects.map((p) => (
                <ProjectList key={p.id} project={p} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </StyledLi>
  );
};

const UserCard: FC<{
  user: User & { projects: Project[] };
}> = ({ user }) => {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Avatar src={user.avatar_url} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{user.name}</h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
          {!!user.projects.length && (
            <>
              <h3>Projects:</h3>
              {user.projects.map((p) => (
                <ProjectList key={p.id} project={p} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  );
};

export default UserCard;

export const StyledLi = styled.li`
  list-style: none;
  padding: 10px 0;
  border-bottom: 1px dashed gray;
  width: 100%;
`;

export const StyledUL = styled.ul`
  margin: 0;
  padding: 10px 0;
  width: 100%;
`;

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`;

function ProjectList({ project }: { project: Project }) {
  return (
    <ProjectContainer>
      <ProjectColumnLeft>
        <ProjectIcon src={project.icon_url} />
      </ProjectColumnLeft>
      <ProjectColumnRight>
        <Link href={`/projects/${project.id}`}>{project.name}</Link>
      </ProjectColumnRight>
    </ProjectContainer>
  );
}

const ProjectIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const ProjectColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`;

const ProjectColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
