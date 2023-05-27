import { useEffect, useState } from 'react';
import Seats from './Seat';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Hoadon } from '~/service';
const createSeat = (rows, startIndex, char) => {
  let i = 0;
  let j = startIndex;
  let k = 'A';
  const section = [];
  while (i < 6 && j <= rows) {
    if (k > 'F') {
      k = 'A';
      j++;
    }
    if (j < rows + 1) {
      section.push(char + j + k);
      k = String.fromCharCode(k.charCodeAt(0) + 1);
    }
  }
  return section;
};

function BookSeat({
  className,
  row,
  startAt,
  typenormal,
  typeprenium,
  data,
  luotdi,
  luotve,
  choseSeat,
}) {
  const [seatSold, setSeatSold] = useState([]);
  // console.log('luotdi', luotdi);
  // console.log('luotve', luotve);
  // console.log('data', data);
  useEffect(() => {
    const fetchData = async () => {
      let document = [];
      if (luotdi === true) {
        document = await Hoadon.getSeatBySeat({
          matuyentau: data.matuyentaudi,
          thoigian: data.thoigiandi,
        });
      } else if (luotve === true) {
        document = await Hoadon.getSeatBySeat({
          matuyentau: data.matuyentaukhuhoi,
          thoigian: data.thoigiankhuhoi,
        });
      }
      // console.log(document);
      setSeatSold(document);
    };
    fetchData().catch(console.error);
  }, [luotdi, luotve]);
  let typeseat;
  if (typeprenium === true) {
    typeseat = createSeat(row, startAt, 'V');
  } else if (typenormal === true) typeseat = createSeat(row, startAt, '');
  // console.log(seatSold);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [bookStatus, setBookedStatus] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const addSeat = (e) => {
    // console.log(e.target.innerText);
    const seatsToBook = 1;
    if (seatsToBook && !e.target.className.includes(clsx(styles.sold))) {
      // console.log(e.target.innerText);

      if (bookedSeats.includes(e.target.innerText)) {
        const newAvailable = bookedSeats.filter(
          (seat) => (data = seat && seat !== e.target.innerText),
        );
        setBookedSeats(newAvailable);
      } else {
        choseSeat(e.target.innerText);
        bookedSeats.shift();
        setBookedSeats([...bookedSeats, e.target.innerText]);
      }
    }
  };
  return (
    <div className={className}>
      <Seats
        addSeat={addSeat}
        values={typeseat}
        seatSold={seatSold}
        bookedSeats={bookedSeats}
      />
    </div>
  );
}

export default BookSeat;
