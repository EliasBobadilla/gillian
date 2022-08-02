import styled from "@emotion/styled";

export const Container = styled.div`
  width: 450px;
  height: 150px;
  background: linear-gradient(#b4bdca 0 0) padding-box,
    /*this is your grey background*/ linear-gradient(to top, #b9b5b5, #efefef)
      border-box;
  color: #313149;
  padding: 10px;
  border: 5px solid transparent;
  border-radius: 15px;
  display: inline-block;
  margin: 75px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Key = styled.button`
  border-radius: 100px;
`;

export const Status = styled.div``;

export const Name = styled.span`
  padding: 5px 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  text-align: left;
  font-size: 1.1em;
  font-weight: bold;
  text-transform: uppercase;
  color: #313149;
  &::before {
    content: "Owner: ";
  }
`;

export const Date = styled.div`
  padding: 5px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  text-align: left;
  font-size: 1.1em;
  font-weight: bold;
  text-transform: uppercase;
  color: #313149;
  &::before {
    content: "Available on: ";
  }
`;
