export const roundOff = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const getLabels = () => {
  let arr = [];
  let arr1 = [0, 1, 2, 3, 4, 5, 6, 7];

  var currentdate = new Date();

  let datetoday =
    currentdate.getFullYear() +
    " " +
    (currentdate.getMonth() + 1) +
    " " +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();

  let shift1 =
    currentdate.getFullYear() +
    " " +
    (currentdate.getMonth() + 1) +
    " " +
    currentdate.getDate() +
    " " +
    "6:30:00";

  let shift2 =
    currentdate.getFullYear() +
    " " +
    (currentdate.getMonth() + 1) +
    " " +
    currentdate.getDate() +
    " " +
    "14:30:00";

  let shift3 =
    currentdate.getFullYear() +
    " " +
    (currentdate.getMonth() + 1) +
    " " +
    currentdate.getDate() +
    " " +
    "21:30:00";

  let end =
    currentdate.getFullYear() +
    " " +
    (currentdate.getMonth() + 1) +
    " " +
    new Date(new Date().setDate(new Date().getDate() + 1)).getDate() +
    " " +
    "6:30:00";

  if (
    new Date(datetoday).getTime() > new Date(shift1).getTime() &&
    new Date(datetoday).getTime() < new Date(shift2).getTime()
  ) {
    console.log("shift1");
    let run = arr1.map(async (item) => {
      let DateStart = new Date(shift1).setHours(
        new Date(shift1).getHours() + item
      );
      let DateEnd = new Date(DateStart).setHours(
        new Date(DateStart).getHours() + 1
      );
      let plus = new Date(DateStart).toLocaleTimeString();
      let plusOne = new Date(DateEnd).toLocaleDateString();
      console.log(new Date(DateStart), new Date(DateEnd).toLocaleTimeString());
      arr.push(plus);
    });

    console.log(arr);
  } else if (
    new Date(datetoday).getTime() > new Date(shift2).getTime() &&
    new Date(datetoday).getTime() < new Date(shift3).getTime()
  ) {
    console.log("shift2");
    let run = arr1.map(async (item) => {
      let DateStart = new Date(shift2).setHours(
        new Date(shift2).getHours() + item
      );
      let DateEnd = new Date(DateStart).setHours(
        new Date(DateStart).getHours() + 1
      );
      let plus = new Date(DateStart).toLocaleTimeString();
      let plusOne = new Date(DateEnd).toISOString();
      console.log(
        new Date(DateStart).toLocaleTimeString(),
        new Date(DateEnd).toLocaleTimeString()
      );

      arr.push(plus);
    });

    console.log(arr);
  } else if (
    new Date(datetoday).getTime() > new Date(shift3).getTime() &&
    new Date(datetoday).getTime() < new Date(end).getTime()
  ) {
    console.log("shift3");

    let run = arr1.map(async (item) => {
      let DateStart = new Date(shift3).setHours(
        new Date(shift3).getHours() + item
      );
      let DateEnd = new Date(DateStart).setHours(
        new Date(DateStart).getHours() + 1
      );
      let plus = new Date(DateStart).toLocaleTimeString();
      let plusOne = new Date(DateEnd).toISOString();
      console.log(
        new Date(DateStart).toLocaleTimeString(),
        new Date(DateEnd).toLocaleTimeString()
      );

      arr.push(plus);
    });

    console.log(arr);
  } else {
    arr.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
  }
  return arr;
};
