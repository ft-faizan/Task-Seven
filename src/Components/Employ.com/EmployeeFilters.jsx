
import styled from "styled-components";

function EmployeeFilters({ filters, onChange, onClear, roles, departments }) {
  return (
    <Wrapper>
      <FilterContainer>
        <InputWrapper>
          <SearchIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </SearchIcon>
          <Input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
          />
        </InputWrapper>

        <SelectWrapper>
          <Select
            value={filters.role}
            onChange={(e) => onChange("role", e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </SelectWrapper>

        <SelectWrapper>
          <Select
            value={filters.department}
            onChange={(e) => onChange("department", e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </Select>
        </SelectWrapper>

        <SelectWrapper>
          <Select
            value={filters.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </SelectWrapper>

        <ClearBtn onClick={onClear}>
          <span>Clear Filters</span>
        </ClearBtn>
      </FilterContainer>
    </Wrapper>
  );
}

export default EmployeeFilters;

const Wrapper = styled.div`
  margin: 10px;
  padding: 5px;

  /* Mobile - reduce margins on satarts small screens */
  @media (max-width: 640px) {
    margin: 5px;
    padding: 2px;
  }
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 14px;
  padding: 10px;
  //  background: rgba(15, 23, 42, 0.4);
  background: rgb(15 23 42 / 15%);
  
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
    align-items: center;

  /* Tablet - screens below 1024px */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 20px;
  }

  /* Mobile - screens below 640px */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  // color: rgba(255, 255, 255, 0.4);
  color:black;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  color: #000000ff;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &::placeholder {
    // color: rgba(255, 255, 255, 0.3);
    color:#5D616B;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 
      0 0 0 3px rgba(99, 102, 241, 0.1),
      0 4px 12px rgba(99, 102, 241, 0.15);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  // background: rgba(15, 23, 42, 0.5);
  background:rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  // color: #fff;
   color:#5D616B;
  // color:black;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;

  option {
    // background: #0f172a;
     background:white;
    color: black;
    padding: 8px;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
    background-color: #0371EA;
    color: #fff;
    box-shadow: 
      0 0 0 3px rgba(99, 102, 241, 0.1),
      0 4px 12px rgba(99, 102, 241, 0.15);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const ClearBtn = styled.button`
  background: rgba(220, 38, 38, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #ef4444;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(220, 38, 38, 0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(220, 38, 38, 0.5);
    color: #fff;
    box-shadow: 
      0 0 20px rgba(220, 38, 38, 0.3),
      0 4px 12px rgba(220, 38, 38, 0.2);
    transform: translateY(-1px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  /* Mobile - full width button */
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;