export const test = (req, res) => {
  res.send("This is user testing route!!!");
  console.log(req.body);
};
