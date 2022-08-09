import React from "react";
import css from "./Section.module.css";
import propTypes from "prop-types";

const Section = ({ children }) => (
  <section className={css.Section}>{children}</section>
);

Section.propTypes = {
  children: propTypes.object,
};

export default Section;
