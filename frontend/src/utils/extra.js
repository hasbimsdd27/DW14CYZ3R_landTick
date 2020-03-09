exports.GetDate = () => {
  const dateNow = new Date().toString().split(" ");
  switch (dateNow[1]) {
    case "Jan":
      return `${parseInt(dateNow[3])}-01-${dateNow[2]}`;
    case "Feb":
      return `${parseInt(dateNow[3])}-02-${dateNow[2]}`;
    case "Mar":
      return `${parseInt(dateNow[3])}-03-${dateNow[2]}`;
    case "Apr":
      return `${parseInt(dateNow[3])}-04-${dateNow[2]}`;
    case "May":
      return `${parseInt(dateNow[3])}-05-${dateNow[2]}`;
    case "Jun":
      return `${parseInt(dateNow[3])}-06-${dateNow[2]}`;
    case "Jul":
      return `${parseInt(dateNow[3])}-07-${dateNow[2]}`;
    case "Aug":
      return `${parseInt(dateNow[3])}-08-${dateNow[2]}`;
    case "Sep":
      return `${parseInt(dateNow[3])}-09-${dateNow[2]}`;
    case "Oct":
      return `${parseInt(dateNow[3])}-10-${dateNow[2]}`;
    case "Nov":
      return `${parseInt(dateNow[3])}-11-${dateNow[2]}`;
    case "Des":
      return `${parseInt(dateNow[3])}-12-${dateNow[4]}`;

    default:
      break;
  }
};

exports.DurasiPerjalanan = ({ departure, arrival }) => {
  const timeDept = departure.split(":");
  const timeArr = arrival.split(":");
  let sisaJam = null;
  let jamUtama = parseInt(timeArr[0]);
  let menit = parseInt(timeArr[1]) - parseInt(timeDept[1]);
  if (menit < 0) {
    menit = parseInt(timeArr[1]) - parseInt(timeDept[1]) + 60;
    sisaJam = jamUtama - 1;
  } else {
    sisaJam = jamUtama;
  }
  let jam = sisaJam - parseInt(timeDept[0]);
  if (jam < 0) {
    jam += 24;
  }
  return `${jam}j ${menit}m`;
};

exports.DateArrival = ({ date, departure, arrival }) => {
  const timeDept = departure.split(":");
  const timeArr = arrival.split(":");
  const durasi = parseInt(timeArr[0]) - parseInt(timeDept[0]);
  let data = date.split("-");
  if (durasi <= 0) {
    let tanggal = parseInt(data[2]) + 1;
    switch (data[1]) {
      case "01":
        return `${tanggal} Januari ${data[0]}`;
      case "02":
        return `${tanggal} Februari ${data[0]}`;
      case "03":
        return `${tanggal} Maret ${data[0]}`;
      case "04":
        return `${tanggal} April ${data[0]}`;
      case "05":
        return `${tanggal} Mei ${data[0]}`;
      case "06":
        return `${tanggal} Juni ${data[0]}`;
      case "07":
        return `${tanggal} Juli ${data[0]}`;
      case "08":
        return `${tanggal} Agustus ${data[0]}`;
      case "09":
        return `${tanggal} September ${data[0]}`;
      case "10":
        return `${tanggal} Oktober ${data[0]}`;
      case "11":
        return `${tanggal} November ${data[0]}`;
      case "12":
        return `${tanggal} Desember ${data[0]}`;

      default:
        break;
    }
  } else {
    switch (data[1]) {
      case "01":
        return `${parseInt(data[2])} Januari ${data[0]}`;
      case "02":
        return `${parseInt(data[2])} Februari ${data[0]}`;
      case "03":
        return `${parseInt(data[2])} Maret ${data[0]}`;
      case "04":
        return `${parseInt(data[2])} April ${data[0]}`;
      case "05":
        return `${parseInt(data[2])} Mei ${data[0]}`;
      case "06":
        return `${parseInt(data[2])} Juni ${data[0]}`;
      case "07":
        return `${parseInt(data[2])} Juli ${data[0]}`;
      case "08":
        return `${parseInt(data[2])} Agustus ${data[0]}`;
      case "09":
        return `${parseInt(data[2])} September ${data[0]}`;
      case "10":
        return `${parseInt(data[2])} Oktober ${data[0]}`;
      case "11":
        return `${parseInt(data[2])} November ${data[0]}`;
      case "12":
        return `${parseInt(data[2])} Desember ${data[0]}`;

      default:
        break;
    }
  }
};

exports.TimeFormat = ({ time }) => {
  let timeArr = time.split(":");
  return `${timeArr[0]}.${timeArr[1]}`;
};

exports.DateFormat = ({ date }) => {
  let data = date.split("-");
  switch (data[1]) {
    case "01":
      return `${parseInt(data[2])} Januari ${data[0]}`;
    case "02":
      return `${parseInt(data[2])} Februari ${data[0]}`;
    case "03":
      return `${parseInt(data[2])} Maret ${data[0]}`;
    case "04":
      return `${parseInt(data[2])} April ${data[0]}`;
    case "05":
      return `${parseInt(data[2])} Mei ${data[0]}`;
    case "06":
      return `${parseInt(data[2])} Juni ${data[0]}`;
    case "07":
      return `${parseInt(data[2])} Juli ${data[0]}`;
    case "08":
      return `${parseInt(data[2])} Agustus ${data[0]}`;
    case "09":
      return `${parseInt(data[2])} September ${data[0]}`;
    case "10":
      return `${parseInt(data[2])} Oktober ${data[0]}`;
    case "11":
      return `${parseInt(data[2])} November ${data[0]}`;
    case "12":
      return `${parseInt(data[2])} Desember ${data[0]}`;

    default:
      break;
  }
};

exports.IDRcurrency = ({ currency }) => {
  let money = new Intl.NumberFormat(["ban", "id"]).format(currency);
  return `Rp. ${money}`;
};

exports.MakeCode = length => {
  let result = "DO-Line-";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
