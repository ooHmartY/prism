import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { spacing, colors, typography, constants } from "../../theme";

import { Row, Column } from "../Grid";
import BoldText from "../Text/BoldText";
import { largeAndUp } from "../../theme/mediaQueries";

const SectionContainer = styled(Column)`
  padding: ${spacing.moderate} ${spacing.normal};
  border-bottom: 1px solid ${colors.lightGray};

  ${largeAndUp`
    border: none;
    padding-left: ${spacing.moderate};
    padding-right: ${spacing.moderate};
  `};
`;

const TitleContainer = styled(Row)`
  padding-bottom: ${spacing.moderate};
`;

const TitleText = styled(BoldText)`
  font-size: ${typography.size.uno};
  color: ${colors.onyx.light};
  text-transform: uppercase;
`;

const Section = ({ title, totalSections, children }) => (
  <SectionContainer large={constants.MAX_COLUMNS / totalSections}>
    <TitleContainer>
      <TitleText>{title}</TitleText>
    </TitleContainer>
    {children}
  </SectionContainer>
);

Section.defaultProps = {
  totalSections: 1,
  children: null
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  totalSections: PropTypes.number,
  children: PropTypes.node
};

export default Section;
