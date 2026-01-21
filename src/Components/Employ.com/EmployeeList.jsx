import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmAlert from "../Reuseable_Components/ConformAlert.jsx";
import { useState } from "react";
function EmployeeList({ employees, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  return (
    <ListWrapper>
      {employees.map((emp) => (
        <Row key={emp.id}>
          <Left>
            <Avatar>{emp.name.charAt(0).toUpperCase()}</Avatar>

            <NameBlock>
              <Name>{emp.name}</Name>
              <Status $status={emp.status}>{emp.status}</Status>
            </NameBlock>
          </Left>

          <Actions>
            <ViewBtn onClick={() => navigate(`/Employees/${emp.id}`)}>
              <span>View</span>
            </ViewBtn>

            <EditBtn onClick={() => onEdit(emp)}>
              <span>Edit</span>
            </EditBtn>

            <DeleteBtn
              onClick={() => {
                setSelectedEmp(emp);
                setOpen(true);
              }}
            >
              <span>Delete</span>
            </DeleteBtn>
          </Actions>
          {/* <ConfirmAlert
            isOpen={open}
            title="Are you sure?"
            message={`Do you want to delete ${selectedEmp?.name}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              if (selectedEmp) {
                onDelete(selectedEmp);
              }
              setOpen(false);
              setSelectedEmp(null);
            }}
            onCancel={() => {
              setOpen(false);
              setSelectedEmp(null);
            }}
          /> */}
        </Row>
      ))}
        <ConfirmAlert
            isOpen={open}
            title="Are you sure?"
            message={`Do you want to delete ${selectedEmp?.name}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              if (selectedEmp) {
                onDelete(selectedEmp);
              }
              setOpen(false);
              setSelectedEmp(null);
            }}
            onCancel={() => {
              setOpen(false);
              setSelectedEmp(null);
            }}
          />
    </ListWrapper>
  );
}

export default EmployeeList;

const slide = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 10px;

  @media (max-width: 640px) {
    gap: 10px;
    padding: 0 5px;
  }
`;

const Row = styled.div`
  // background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 18px 22px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    align-items: flex-start;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 50%;
  // background: cadetblue;
  // justify-content: space-between;

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background-color: #0371ea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 0 4px 16px rgba(3, 113, 234, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${slide} 3s infinite;
  }
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: space-between;
  align-items: center;
  /* background: teal; */
  width: 50%;
`;

const Name = styled.span`
  // color: #fff;
  color:#5D616B;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.2px;
`;

const Status = styled.span`
  font-size: 12px;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 600;
  color: ${({ $status }) => ($status === "active" ? "#16a34a" : "#dc2626")};
  background: ${({ $status }) =>
    $status === "active"
      ? "rgba(220, 252, 231, 0.2)"
      : "rgba(254, 226, 226, 0.2)"};
  border: 1px solid
    ${({ $status }) =>
      $status === "active"
        ? "rgba(34, 197, 94, 0.3)"
        : "rgba(220, 38, 38, 0.3)"};
  backdrop-filter: blur(10px);
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ViewBtn = styled.button`
  background: rgba(3, 113, 234, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(3, 113, 234, 0.3);
  color: #3b82f6;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(3, 113, 234, 0.2),
      rgba(3, 113, 234, 0.3)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(3, 113, 234, 0.5);
    color: #60a5fa;
    // box-shadow:
    //   0 0 20px rgba(3, 113, 234, 0.3),
    //   0 4px 12px rgba(3, 113, 234, 0.2);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const EditBtn = styled.button`
  background: rgba(3, 113, 234, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(3, 113, 234, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(3, 113, 234, 0.3);

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.3),
      rgba(37, 99, 235, 0.3)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(59, 130, 246, 1);
    color: #dbeafe;
    // box-shadow:
    //   0 0 20px rgba(3, 113, 234, 0.5),
    //   0 6px 16px rgba(3, 113, 234, 0.4);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const DeleteBtn = styled.button`
  background: rgba(220, 38, 38, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(220, 38, 38, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(239, 68, 68, 0.3),
      rgba(185, 28, 28, 0.3)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(239, 68, 68, 1);
    // box-shadow:
    //   0 0 20px rgba(220, 38, 38, 0.5),
    //   0 6px 16px rgba(220, 38, 38, 0.4);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;
