type country = {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
};
type User = {
  _id: string;
  mobile: string;
  name: string;
  lastname?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
