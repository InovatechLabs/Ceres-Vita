import styled from "styled-components";

interface Props {
  label: string;
  click: () => void;
}

export function Button({ label, click }: Props) {
  return <ButtonSld onClick={click}>{label}</ButtonSld>;
}

const ButtonSld = styled.button`
  padding: 8px 20px;
  margin-right: 10px;
  background-color: rgb(23, 68, 119);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(75, 114, 160);
  }
`;
