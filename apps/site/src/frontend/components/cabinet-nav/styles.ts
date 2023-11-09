import { styled } from "solid-styled-components";
import {
  ANIM_DURATION,
  BAR_HEIGHT,
  COLOR_CHARTREUSE,
  COLOR_GRAY_105,
  COLOR_GRAY_115,
  HEADER_HEIGHT,
} from "../../ui-kit";

export const CabinetNavWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: ${(HEADER_HEIGHT + BAR_HEIGHT).toString()}px;

  display: flex;
  width: 290px;
  flex-direction: column;
  align-items: flex-start;

  & > div:not(:nth-of-type(1)) {
    border-top: 1px solid ${COLOR_GRAY_115};
  }
`;

export const CabinetNavItem = styled.div`
  display: flex;
  padding: 25px 45px;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  background-color: transparent;
  transition: background-color ${ANIM_DURATION} ease-out;

  &:not(.active):hover {
    background-color: ${COLOR_GRAY_105};

    cursor: pointer;
  }
`;

export const CabinetNavItemDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: ${COLOR_CHARTREUSE};
  border-radius: 3px;
`;
