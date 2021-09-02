export default class Config {
  static url = `https://scotstudy.foodengo.com/api/`;
  //static url = `http://localhost:8000/api/`;

  static years: any = () => {
    var d = new Date();
    var currentYear = d.getFullYear();
    const dates = [];
    for (let i = 2000; i <= currentYear; i++) {
      dates.push(i);
    }

    return dates;
  };

  static dashRoute = () => {
    return `/dashboard/${Math.random() * 10}`;
  };
}

export enum LoadStatus {
  Loading,
  Empty,
  Loaded,
}
