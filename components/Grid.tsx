import styled from "styled-components";

const Grid = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, calc(33% - 20px));
`;

export default Grid;
