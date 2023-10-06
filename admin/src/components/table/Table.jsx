import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Pokhara Tourist Home",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/293934032.jpg?k=bcdfd57aecc9c165c6aebe1c0d2931bdc83ad9fda498351a4b40a46d2a5ddc6a&o=&hp=1",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Hotel Tourist Residency",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/494097152.jpg?k=42a315e818c0e7720079f8b7e2ff793a5d71a46ee4e23cb53113f1b6b1c4b0a3&o=&hp=1",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Majestic Lake Front Hotel & Suites",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/479465548.jpg?k=4ea35d663cb7103c67532a5f3830312b6a7fc28365440c2ee90a11350f27d6e1&o=&hp=1",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Sarangkot Mountain Lodge",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Hotel Fewa Camp",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/367370568.jpg?k=1da374d32ecd5f251c324c883d8632547363960b4607a19cb9e125e74301ab5d&o=&hp=1",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell className="tableCell">{row?.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row?.img} alt="" className="image" />
                  {row?.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row?.customer}</TableCell>
              <TableCell className="tableCell">{row?.date}</TableCell>
              <TableCell className="tableCell">{row?.amount}</TableCell>
              <TableCell className="tableCell">{row?.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row?.status}`}>{row?.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
