const ValidationErrors = ({ errors }) => {
  if (errors.length) {
    return (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default ValidationErrors;
