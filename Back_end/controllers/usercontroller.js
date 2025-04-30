export const getUser = (req, res) => {
  res.status(200).json({ message: "User fetched successfully" });
};

export const createUser = (req, res) => {
  res.status(201).json({ message: "User created successfully" });
};
