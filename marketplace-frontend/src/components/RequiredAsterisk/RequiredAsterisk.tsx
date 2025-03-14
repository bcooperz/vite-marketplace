import classes from "@/components/RequiredAsterisk/RequiredAsterisk.module.css";

const RequiredAsterisk = () => {
  return (
    <span className={classes.requiredAsterisk} aria-hidden>
      {" "}
      &#42;
    </span>
  );
};

export default RequiredAsterisk;
