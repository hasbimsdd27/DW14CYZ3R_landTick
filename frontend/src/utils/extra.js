exports.DurasiPerjalanan = ({ departure, arrival }) => {
  const timeDept = departure.split(":");
  const timeArr = arrival.split(":");
  let sisaJam = null;
  let menit = parseInt(timeArr[1]) - parseInt(timeDept[1]);
  if (menit < 0) {
    menit = parseInt(timeArr[1]) - parseInt(timeDept[1]) + 60;
    sisaJam = parseInt(timeArr[0] - 1);
  }
  let jam = sisaJam - parseInt(timeDept[0]);
  if (jam < 0) {
    jam = sisaJam - parseInt(timeDept[1]) + 24;
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
