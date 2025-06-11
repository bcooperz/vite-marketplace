import AppError from "./AppError";

class CreateModalNotInitialised extends AppError {
  constructor(description = "Create modal function not set") {
    super(description);
    this.name = "CreateModalNotInitialised";
  }
}

export default CreateModalNotInitialised;
