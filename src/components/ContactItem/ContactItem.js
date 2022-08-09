import React from "react";
import css from "./ContactItem.module.css";
import PropTypes from "prop-types";

const ContactItem = ({ name, number }) => (
  <p className={css.contactText}>
    {name}: {number}
  </p>
);

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactItem;
