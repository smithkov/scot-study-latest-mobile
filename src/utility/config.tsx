export default class Config {
  static url = `https://scotstudy.foodengo.com/api/`;

  static years: any = () => {
    var d = new Date();
    var currentYear = d.getFullYear();
    const dates = [];
    for (let i = 2000; i <= currentYear; i++) {
      dates.push(i);
    }

    return dates;
  };
}
