const transformDateTime = date => {
  const day = `${
    date.getDate().toString().length === 1 ? "0" : ""
  }${date.getDate()}`;
  const month = `${
    date.getMonth().toString().length === 1 ? "0" : ""
  }${date.getMonth()+1}`;
  const year = date.getYear() - 100;
  const hour = `${
    date.getHours().toString().length === 1 ? "0" : ""
  }${date.getHours()}`;
  const minutes = `${
    date.getMinutes().toString().length === 1 ? "0" : ""
  }${date.getMinutes()}`;

  return `20${year}-${month}-${day} ${hour}:${minutes}`;
};

const transformDate = date => {
  const day = `${
    date.getDate().toString().length === 1 ? "0" : ""
  }${date.getDate()}`;
  const month = `${
    date.getMonth().toString().length === 1 ? "0" : ""
  }${date.getMonth()+1}`;
  const year = date.getYear() - 100;
  return `20${year}-${month}-${day}`;
};

const transformFromDB = date => {
  if (date !== null) {
    const dateTime = date.split("T");
    const time = dateTime[1].slice(0, 5);
    return `${dateTime[0]} ${time}`
    
  }

};

const sort = (a, b) => {
  a.date = a.date.split('-').join('');
  b.date = b.date.split('-').join('');
  return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
}

const today = transformDate(new Date());
const threeDaysAgo = transformDate(new Date(Date.now() - 3 * 24 * 3600 * 1000));
const now = transformDateTime(new Date());

export { today, threeDaysAgo, now, transformDate, transformDateTime, transformFromDB };
